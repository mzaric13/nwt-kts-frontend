import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveAcceptComponent } from './drive-accept.component';

describe('DriveAcceptComponent', () => {
  let component: DriveAcceptComponent;
  let fixture: ComponentFixture<DriveAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveAcceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
