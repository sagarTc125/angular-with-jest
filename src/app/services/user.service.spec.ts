import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Check userLoginValue', () => {
    /* here we're changing the default of 
    isUserLoggedIn behavior subject i.e false to true.
    */
    service.isUserLoggedIn.next(true);

    // here's where we access the value of the isUserLoggedIn behavior subject.
    let loginValue = service.userLoginValue;

    expect(loginValue).toBeTruthy();
  });
});
