import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDriveRejectedComponent } from './page-drive-rejected.component';

describe('PageDriveRejectedComponent', () => {
  let component: PageDriveRejectedComponent;
  let fixture: ComponentFixture<PageDriveRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDriveRejectedComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDriveRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
