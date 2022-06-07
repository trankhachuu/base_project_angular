import { ValidationService } from './../../services/validation.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent {

  @Input() control: FormControl | undefined;

  get errorMessage(): null | string {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        if (Object.prototype.hasOwnProperty.call(this.control.errors, propertyName) && this.control.touched) {
          return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
    }

    return null;
  }

}
