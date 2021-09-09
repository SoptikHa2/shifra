import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDialogComponent } from './ask-dialog.component';

describe('AskDialogComponent', () => {
  let component: AskDialogComponent;
  let fixture: ComponentFixture<AskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
