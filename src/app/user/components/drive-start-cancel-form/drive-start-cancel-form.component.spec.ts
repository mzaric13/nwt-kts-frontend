import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveStartCancelFormComponent } from './drive-start-cancel-form.component';

describe('DriveStartCancelFormComponent', () => {
  let component: DriveStartCancelFormComponent;
  let fixture: ComponentFixture<DriveStartCancelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveStartCancelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveStartCancelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
