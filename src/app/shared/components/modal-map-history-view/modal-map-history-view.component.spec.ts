import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapHistoryViewComponent } from './modal-map-history-view.component';

describe('ModalMapHistoryViewComponent', () => {
  let component: ModalMapHistoryViewComponent;
  let fixture: ComponentFixture<ModalMapHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMapHistoryViewComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMapHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
