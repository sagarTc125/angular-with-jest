import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public isUserLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe((userLogin: boolean) => {
      this.isUserLoggedIn = userLogin;
    });
  }
}
