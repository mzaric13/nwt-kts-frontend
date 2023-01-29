import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalCardComponent } from './paypal-card.component';

describe('PaypalCardComponent', () => {
  let component: PaypalCardComponent;
  let fixture: ComponentFixture<PaypalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
