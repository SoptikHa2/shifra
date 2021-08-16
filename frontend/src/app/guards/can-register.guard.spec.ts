import { TestBed } from '@angular/core/testing';

import { CanRegisterGuard } from './can-register.guard';

describe('CanRegisterGuard', () => {
  let guard: CanRegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanRegisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
