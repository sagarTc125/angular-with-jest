import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userData: any = { id: 'admin@testmail.com', name: 'Admin', pwd: 'admin' };
  let userServiceMock: any = {};

  function setUpPreRequisites() {
    userServiceMock = {
      isUserLoggedIn: new BehaviorSubject(false),
      userLoginValue: {},
      userData: new BehaviorSubject(undefined),
      usersArray: new BehaviorSubject([]),
    };

    // attaching get method to the userLoginValue function.
    Object.defineProperty(userServiceMock, 'userLoginValue', {
      get: () => {
        return userServiceMock.isUserLoggedIn.value;
      },
    });
  }

  beforeEach(async () => {
    setUpPreRequisites();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check Login for no credentials entered & user not found condition.', () => {
    component.onLogin();
    expect(component.errorMsg).toEqual('Please Enter UserId & Password.');

    component.userId = 'admin';
    component.password = 'admin';

    component.onLogin();
    expect(component.errorMsg).toEqual('User Not Found!');
  });

  it('check Login for invalid credentials & successful login.', () => {
    userServiceMock.usersArray.next([userData]);

    component.userId = 'admin@testmail.com';
    component.password = 'adminFalse';

    component.onLogin();
    expect(component.errorMsg).toEqual('User Id or Password incorrect!');

    component.userId = 'admin@testmail.com';
    component.password = 'admin';

    let resetFunSpy: any = jest.spyOn(component, 'resetFieldValues');

    component.onLogin();
    expect(component.isUserLoggedIn).toBeTruthy();
    expect(userServiceMock.userLoginValue).toBeTruthy();
    expect(resetFunSpy).toHaveBeenCalled();
    expect(localStorage.getItem('user')).toBeDefined();
  });

  it('Check if is in signup mode', () => {
    expect(component.isInSignupMode).toBeFalsy();

    let resetFunSpy: any = jest.spyOn(component, 'resetFieldValues');

    component.onSignUp();

    expect(resetFunSpy).toHaveBeenCalled();
    expect(component.isInSignupMode).toBeTruthy();
  });

  it("Check while signup all details not entered and in case password and confirm password doesn't match.", () => {
    component.isInSignupMode = true;
    component.onSignUp();

    expect(component.errorMsg).toBe('Please fill up all the details');

    component.userId = 'admin';
    component.password = 'admin';
    component.confirmPwd = 'admin2';
    component.userName = 'admin';

    component.onSignUp();
    expect(component.errorMsg).toBe('Passwords does not match!');
  });

  it('Check Successful signup.', () => {
    component.isInSignupMode = true;
    component.userId = 'admin';
    component.password = 'admin';
    component.confirmPwd = 'admin';
    component.userName = 'admin';

    let resetFunSpy: any = jest.spyOn(component, 'resetFieldValues');

    component.onSignUp();

    expect(resetFunSpy).toHaveBeenCalled();
    expect(component.isInSignupMode).toBeFalsy();
  });

  it('Test isUserLoggedIn behavior subject & userLoginValue get method.', () => {
    // assigning true to the value instead of it's default value false.
    userServiceMock.isUserLoggedIn.next(true);

    component.ngOnInit();
    // storing value in variable to test
    const userLoginValue: boolean = userServiceMock.userLoginValue;

    /* testing the value of variable
    Note: storing userLoginValue value in variable & write 
    expect is not needed for actual code coverage it's just for reference */
    expect(userLoginValue).toBeTruthy();

    // testing the actual component variable using the value of userLoginValue
    expect(component.isUserLoggedIn).toBeTruthy();
  });
});
