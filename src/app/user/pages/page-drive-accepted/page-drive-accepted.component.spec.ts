import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDriveAcceptedComponent } from './page-drive-accepted.component';

describe('PageDriveAcceptedComponent', () => {
  let component: PageDriveAcceptedComponent;
  let fixture: ComponentFixture<PageDriveAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDriveAcceptedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDriveAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
