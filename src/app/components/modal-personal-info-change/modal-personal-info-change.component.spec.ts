import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalPersonalInfoChangeComponent } from './modal-personal-info-change.component';

describe('ModalPersonalInfoChangeComponent', () => {
  let component: ModalPersonalInfoChangeComponent;
  let fixture: ComponentFixture<ModalPersonalInfoChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPersonalInfoChangeComponent ], imports: [ HttpClientModule, FormsModule, ReactiveFormsModule ]
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
