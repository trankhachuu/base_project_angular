import { AuthService } from './../../../../common/services/auth.service';
import { IUser } from './../../../../common/models/user-login-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public currentUser?: IUser;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }
}
