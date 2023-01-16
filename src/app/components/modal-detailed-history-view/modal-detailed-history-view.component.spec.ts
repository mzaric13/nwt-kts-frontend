import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailedHistoryViewComponent } from './modal-detailed-history-view.component';

describe('ModalDetailedHistoryViewComponent', () => {
  let component: ModalDetailedHistoryViewComponent;
  let fixture: ComponentFixture<ModalDetailedHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailedHistoryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailedHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
