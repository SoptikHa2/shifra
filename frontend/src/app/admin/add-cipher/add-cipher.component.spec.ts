import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCipherComponent } from './add-cipher.component';

describe('AddCipherComponent', () => {
  let component: AddCipherComponent;
  let fixture: ComponentFixture<AddCipherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCipherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCipherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
