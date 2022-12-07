import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPersonalInfoChangeComponent } from './modal-personal-info-change.component';

describe('ModalPersonalInfoChangeComponent', () => {
  let component: ModalPersonalInfoChangeComponent;
  let fixture: ComponentFixture<ModalPersonalInfoChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPersonalInfoChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPersonalInfoChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
