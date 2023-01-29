import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewDriveHistoryComponent } from './page-view-drive-history.component';

describe('PageViewDriveHistoryComponent', () => {
  let component: PageViewDriveHistoryComponent;
  let fixture: ComponentFixture<PageViewDriveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewDriveHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageViewDriveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
