import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewPersonalInfoComponent } from './modal-view-personal-info.component';

describe('ModalViewPersonalInfoComponent', () => {
  let component: ModalViewPersonalInfoComponent;
  let fixture: ComponentFixture<ModalViewPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
