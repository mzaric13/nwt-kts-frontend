import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveEndFormComponent } from './drive-end-form.component';

describe('DriveEndFormComponent', () => {
  let component: DriveEndFormComponent;
  let fixture: ComponentFixture<DriveEndFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveEndFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveEndFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
