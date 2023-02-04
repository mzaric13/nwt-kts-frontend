import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeBlockedStatusComponent } from './modal-change-blocked-status.component';

describe('ModalChangeBlockedStatusComponent', () => {
  let component: ModalChangeBlockedStatusComponent;
  let fixture: ComponentFixture<ModalChangeBlockedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangeBlockedStatusComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalChangeBlockedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
