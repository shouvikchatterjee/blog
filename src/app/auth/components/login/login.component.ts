import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataResolverService } from '../../services/data-resolver.service';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  errorMsg = '';
  userModal = {
    userName: '',
    password: ''
  };

  constructor(
    private router: Router,
    private dataResolverService: DataResolverService,
    private globalService: GlobalService,
  ) { }

  /**
   * Login Form Submit
   */
  onSubmit() {
    this.dataResolverService.fetchUser().subscribe(
      res => {
        this.userAuthentication(res);
      },
      err => {
        console.log(err);
        this.errorMsg = 'Cannot connect to the server!';
      });
  }

  /**
   * Existing User Authentication
   * @param users
   */
  userAuthentication(users) {
    users.forEach(user => {
      if (user.userName === this.userModal.userName && user.password === this.userModal.password) {
        this.globalService.setUserInfo(user.id, user.role);
        const redirectUrl = (user.role === 'admin') ? 'admin' : 'blog';
        this.navigateToUrl(redirectUrl);
      } else {
        const userInfo = this.globalService.getUserInfo();
        if (user.id === users.length && !userInfo) {
          this.errorMsg = 'User does not exist!';
        }
      }
    });
  }

  /**
   * Navigate to URL
   * @param url = admin/blog
   */
  navigateToUrl(url: string) {
    this.router.navigate([url]);
  }

  /**
   * Redirect to Signup route
   */
  onSignUp() {
    this.navigateToUrl('auth/signup/');
  }

  /**
   * Reset error message
   */
  resetErrorMessage() {
    this.errorMsg = '';
  }

}
