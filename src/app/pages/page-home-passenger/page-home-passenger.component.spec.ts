import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHomePassengerComponent } from './page-home-passenger.component';

describe('PageHomePassengerComponent', () => {
  let component: PageHomePassengerComponent;
  let fixture: ComponentFixture<PageHomePassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHomePassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHomePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
