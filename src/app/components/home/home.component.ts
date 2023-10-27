import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userData: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userData = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : undefined;
  }

  public onLogOut(): void {
    this.userService.isUserLoggedIn.next(false);
    localStorage.removeItem('user');
  }
}
