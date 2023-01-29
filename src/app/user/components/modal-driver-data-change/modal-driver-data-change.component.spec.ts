import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDriverDataChangeComponent } from './modal-driver-data-change.component';

describe('ModalDriverDataChangeComponent', () => {
  let component: ModalDriverDataChangeComponent;
  let fixture: ComponentFixture<ModalDriverDataChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDriverDataChangeComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDriverDataChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
