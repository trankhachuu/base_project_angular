import { EventManager } from './../../service/event-manager.service';
import { AlertError } from './../../model/alert-error.model';
import { EventWithContent } from './../../model/event-with-content.model';
import { Router } from '@angular/router';
import { AlertService } from './../../service/alert.service';
import { Alert } from './../../model/alert.model';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent implements OnDestroy {
  alerts: Alert[] = [];
  errorListener: Subscription;
  httpErrorListener: Subscription;

  constructor(private alertService: AlertService, private eventManager: EventManager, private router: Router) {
    this.errorListener = eventManager.subscribe('perksApp.error', (response: EventWithContent<unknown> | string) => {
      const errorResponse = (response as EventWithContent<AlertError>).content;
      this.addErrorAlert(errorResponse.message);
    });

    this.httpErrorListener = eventManager.subscribe('perksApp.httpError', (response: EventWithContent<unknown> | string) => {
      const httpErrorResponse = (response as EventWithContent<HttpErrorResponse>).content;
      switch (httpErrorResponse.status) {
        // connection refused, server not reachable
        case 0:
          this.addErrorAlert('Server not reachable');
          break;

        case 400: {
          const arr = httpErrorResponse.headers.keys();
          let errorHeader: string | null = null;
          for (const entry of arr) {
            if (entry.toLowerCase().endsWith('app-error')) {
              errorHeader = httpErrorResponse.headers.get(entry);
            }
          }
          if (errorHeader) {
            this.addErrorAlert(errorHeader);
          } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
            const fieldErrors = httpErrorResponse.error.fieldErrors;
            for (const fieldError of fieldErrors) {
              if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                fieldError.message = 'Size';
              }
              // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
              const convertedField: string = fieldError.field.replace(/\[\d*\]/g, '[]');
              const fieldName: string = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
              this.addErrorAlert(`Error on field "${fieldName}"`);
            }
          } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
            this.addErrorAlert(httpErrorResponse.error.detail ?? httpErrorResponse.error.message);
          } else {
            this.addErrorAlert(httpErrorResponse.error);
          }
          break;
        }

        case 403:
          this.router.navigate(['/accessdenied']);
          break;
        case 404:
          this.addErrorAlert('Not found');
          break;

        default:
          if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
            this.addErrorAlert(httpErrorResponse.error.detail ?? httpErrorResponse.error.message);
          } else {
            this.addErrorAlert(httpErrorResponse.error);
          }
      }
    });
  }

  setClasses(alert: Alert): { [key: string]: boolean } {
    const classes = { 'jhi-toast': Boolean(alert.toast) };
    if (alert.position) {
      return { ...classes, [alert.position]: true };
    }
    return classes;
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.errorListener);
    this.eventManager.destroy(this.httpErrorListener);
  }

  close(alert: Alert): void {
    alert.close?.(this.alerts);
  }

  private addErrorAlert(message?: string): void {
    this.alertService.addAlert({ type: 'danger', message }, this.alerts);
  }
}
