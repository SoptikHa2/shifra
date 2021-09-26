import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHintComponent } from './add-hint.component';

describe('AddHintComponent', () => {
  let component: AddHintComponent;
  let fixture: ComponentFixture<AddHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
