import { TypeNotification } from './../../../../common/enum/type-notification';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { TypeResponse } from 'src/app/common/enum/type-reposone';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseDestroyableDirective implements OnInit {
  public messageError!: string;
  public showLoadingLogin!: boolean;

  constructor(private authService: AuthService,
    private toastr: ToastrService) {
    super();
    this.showLoadingLogin = false;
  }

  ngOnInit(): void {
  }

  public submitLogin($event: any): void {
    this.showLoadingLogin = true;
    this.authService
      .login($event.email, $event.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result.status === TypeResponse.Success) {
            this.toastr.success('Login success', TypeNotification.Success);
          }
          else {
            this.messageError = result.message;
          }
        },
        error: (e) => this.messageError = e.message,
        complete: () => this.showLoadingLogin = false
      });
  }
}
