import { TestBed } from '@angular/core/testing';

import { JoinTeamGuard } from './join-team.guard';

describe('JoinGameGuard', () => {
  let guard: JoinTeamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JoinTeamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
