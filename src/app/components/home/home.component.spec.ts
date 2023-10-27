import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userServiceMock: any = {
    isUserLoggedIn: new BehaviorSubject(true),
  };
  let localStorageMock: any;

  let userData: any = { id: 'admin@testmail.com', name: 'Admin', pwd: 'admin' };

  let setUpLocalStorageMock = () => {
    localStorageMock = (function () {
      let store: any = {};

      return {
        getItem(key: string) {
          return store[key];
        },
        setItem(key: string, value: string) {
          store[key] = value;
        },
        clear() {
          store = {};
        },
        removeItem(key: string) {
          delete store[key];
        },
        getAll() {
          return store;
        },
      };
    })();

    // this is the place where we place our mocked localstorage instead of the real one.
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    localStorage.setItem('user', JSON.stringify(userData));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compileComponents();

    setUpLocalStorageMock();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('confirm userData', () => {
    expect(component.userData).toEqual(userData);
  });

  it('onLogOut function test.', () => {
    /* just for the reference that the user data exist
    initially before we remove it by onLogOut function.
    */
    expect(localStorage.getItem('user')).not.toBeFalsy();

    //actual test case starts here.
    component.onLogOut();
    expect(userServiceMock.isUserLoggedIn.value).toBeFalsy();
    expect(localStorage.getItem('user')).toBeFalsy();
  });
});
