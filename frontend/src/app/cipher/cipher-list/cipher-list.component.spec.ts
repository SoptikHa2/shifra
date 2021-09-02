import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherListComponent } from './cipher-list.component';

describe('CipherListComponent', () => {
  let component: CipherListComponent;
  let fixture: ComponentFixture<CipherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CipherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CipherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
