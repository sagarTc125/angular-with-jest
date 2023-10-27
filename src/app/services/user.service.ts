import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usersArray: BehaviorSubject<any> = new BehaviorSubject([]);

  public isUserLoggedIn: BehaviorSubject<any> = new BehaviorSubject(false);

  public userData: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor() {}

  public get userLoginValue(): boolean {
    return this.isUserLoggedIn.value;
  }
}
