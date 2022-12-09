import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdminProfileComponent } from './page-admin-profile.component';

describe('PageAdminProfileComponent', () => {
  let component: PageAdminProfileComponent;
  let fixture: ComponentFixture<PageAdminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAdminProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
