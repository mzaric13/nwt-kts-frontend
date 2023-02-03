import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveRejectComponent } from './drive-reject.component';

describe('DriveRejectComponent', () => {
  let component: DriveRejectComponent;
  let fixture: ComponentFixture<DriveRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
