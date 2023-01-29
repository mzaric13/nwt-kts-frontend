import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideOptionsComponent } from './ride-options.component';

describe('RideOptionsComponent', () => {
  let component: RideOptionsComponent;
  let fixture: ComponentFixture<RideOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
