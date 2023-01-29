import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveInconsistencyFormComponent } from './drive-inconsistency-form.component';

describe('DriveInconsistencyFormComponent', () => {
  let component: DriveInconsistencyFormComponent;
  let fixture: ComponentFixture<DriveInconsistencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveInconsistencyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveInconsistencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
