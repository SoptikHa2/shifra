import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be taken', (done: DoneFn) => {
    service.user.next({loggedIn: true, person: {nickname: ""}});
      service.checkUserAvailability('foobar').then(r => {
          expect(r).toBeFalse();
          done();
        }).catch(() => {
      });
  });

  it ('should be available', (done: DoneFn) => {
    service.user.next({loggedIn: true, person: {nickname: ""}});
    service.checkUserAvailability('random').then(r => {
      expect(r).toBeTrue();
      done();
    }).catch(() => {});
  });
});
