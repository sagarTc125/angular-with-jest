import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public userService: UserService) {}

  public userId: string = '';
  public password: string = '';
  public confirmPwd: string = '';
  public userName: string = '';
  public isInSignupMode: boolean = false;
  public errorMsg: string = '';
  @Input() isUserLoggedIn: boolean = false;
  public users: any[] = [];

  ngOnInit(): void {
    /* here's where value of isUserLoggedIn behavior 
    subject is accessed via userLoginValue */
    this.isUserLoggedIn = this.userService.userLoginValue;

    this.userService.usersArray.subscribe((usersList: any[]) => {
      this.users = usersList;
    });
  }

  public onLogin(): void {
    this.errorMsg = '';
    if (this.userId && this.password) {
      this.userService.usersArray.subscribe((usersArray: any[]) => {
        const userData: any = usersArray.find(
          (element) => element.id === this.userId
        );
        if (userData) {
          if (userData.pwd === this.password) {
            this.isUserLoggedIn = true;
            this.userService.isUserLoggedIn.next(true);
            this.resetFieldValues();
            this.userService.userData.next(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            this.errorMsg = 'User Id or Password incorrect!';
          }
        } else {
          this.errorMsg = 'User Not Found!';
        }
      });
    } else {
      this.errorMsg = 'Please Enter UserId & Password.';
    }
  }

  public onSignUp(): void {
    if (this.isInSignupMode) {
      if (this.userId && this.password && this.confirmPwd && this.userName) {
        if (this.password === this.confirmPwd) {
          this.userService.usersArray.next([
            ...this.users,
            { id: this.userId, name: this.userName, pwd: this.password },
          ]);
          this.resetFieldValues();
          this.isInSignupMode = false;
        } else {
          this.errorMsg = 'Passwords does not match!';
        }
      } else {
        this.errorMsg = 'Please fill up all the details';
      }
    } else {
      this.isInSignupMode = !this.isInSignupMode;
      this.resetFieldValues();
    }
    this.isUserLoggedIn = false;
  }

  public resetFieldValues(): void {
    this.userId = '';
    this.password = '';
    this.confirmPwd = '';
    this.userName = '';
    this.errorMsg = '';
  }
}
