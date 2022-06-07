import { IUserLogin } from './../../../../common/models/user-login-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() messageError!: string;
  @Input() set showLoadingLogin(value: boolean) {
    value ? this.spinner.show() : this.spinner.hide()
    this._showLoadingLogin = value;
  }
  @Output() submitLoginFormEvent = new EventEmitter<IUserLogin>();

  public _showLoadingLogin!: boolean; 
  public loginForm!: FormGroup;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  private createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  public submitLogin(): void {
    this.loginForm.markAllAsTouched();
    
    if(!this.loginForm.valid){
      return;
    }

    if(!this.loginForm.dirty){
      return
    }
   
    this.submitLoginFormEvent.emit(this.loginForm.value);
  }
}
