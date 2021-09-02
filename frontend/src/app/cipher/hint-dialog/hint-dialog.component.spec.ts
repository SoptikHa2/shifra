import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintDialogComponent } from './hint-dialog.component';

describe('HintDialogComponent', () => {
  let component: HintDialogComponent;
  let fixture: ComponentFixture<HintDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
