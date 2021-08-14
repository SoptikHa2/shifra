import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherGameListComponent } from './cipher-game-list.component';

describe('CipherGameListComponent', () => {
  let component: CipherGameListComponent;
  let fixture: ComponentFixture<CipherGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CipherGameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CipherGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
