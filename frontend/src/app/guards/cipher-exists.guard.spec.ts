import { TestBed } from '@angular/core/testing';

import { CipherExistsGuard } from './cipher-exists.guard';

describe('CipherExistsGuard', () => {
  let guard: CipherExistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CipherExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
