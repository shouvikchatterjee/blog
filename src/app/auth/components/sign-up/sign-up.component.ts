import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataResolverService } from '../../services/data-resolver.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  userModal = {
    userName: '',
    password: '',
    role: 'user',
    permissions: {
      add: true,
      edit: true,
      delete: true
    },
  };
  userList=[];
  userAlreadyExist = false;

  constructor(
    private router: Router,
    private dataResolverService: DataResolverService
  ) { }

  /**
   * Signup Form Submit
   */
  onSubmit() {
    this.userAlreadyExist = false;
    this.dataResolverService.fetchUser().subscribe(
      users => {
        this.userList = users;
        this.checkUser();
      },
      err => {
        console.log(err);
      });
  }

  /**
   * check user already exist or not
   */
  checkUser(){
    let i;
    for(i=0;i<this.userList.length;i++){
      if(this.userModal.userName === this.userList[i].userName){
        this.userAlreadyExist = true;
        break;
      }
    }    
    if(i === this.userList.length){
      this.createUser();
    }
  }

  /**
   * create user
   */
  createUser(){
    this.dataResolverService.addUser(this.userModal).subscribe(
      _ => {
        this.navigateToSignin();
      },
      err => {
        console.log(err);
      });
  }

  /**
   * Navigate to Signin
   */
  navigateToSignin() {
    this.router.navigate(['/auth']);
  }
}
