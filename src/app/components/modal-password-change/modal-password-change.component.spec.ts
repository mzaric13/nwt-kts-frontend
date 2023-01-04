import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPasswordChangeComponent } from './modal-password-change.component';

describe('ModalPasswordChangeComponent', () => {
  let component: ModalPasswordChangeComponent;
  let fixture: ComponentFixture<ModalPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPasswordChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
