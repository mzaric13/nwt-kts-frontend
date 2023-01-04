import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPictureChangeComponent } from './modal-picture-change.component';

describe('ModalPictureChangeComponent', () => {
  let component: ModalPictureChangeComponent;
  let fixture: ComponentFixture<ModalPictureChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPictureChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPictureChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
