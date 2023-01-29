import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChangeBlockedStatusComponent } from './page-change-blocked-status.component';

describe('PageChangeBlockedStatusComponent', () => {
  let component: PageChangeBlockedStatusComponent;
  let fixture: ComponentFixture<PageChangeBlockedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageChangeBlockedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageChangeBlockedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
