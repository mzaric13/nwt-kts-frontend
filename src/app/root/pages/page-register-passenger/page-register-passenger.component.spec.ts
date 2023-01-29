import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegisterPassengerComponent } from './page-register-passenger.component';

describe('PageRegisterPassengerComponent', () => {
  let component: PageRegisterPassengerComponent;
  let fixture: ComponentFixture<PageRegisterPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRegisterPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRegisterPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
