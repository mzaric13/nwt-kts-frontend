import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForgottenPasswordComponent } from './page-forgotten-password.component';

describe('PageForgottenPasswordComponent', () => {
  let component: PageForgottenPasswordComponent;
  let fixture: ComponentFixture<PageForgottenPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageForgottenPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageForgottenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
