import { TestBed } from '@angular/core/testing';

import { CanLogInGuard } from './can-log-in.guard';

describe('CanLogInGuard', () => {
  let guard: CanLogInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLogInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
