import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStartPageComponent } from './navbar-start-page.component';

describe('NavbarStartPageComponent', () => {
  let component: NavbarStartPageComponent;
  let fixture: ComponentFixture<NavbarStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarStartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
