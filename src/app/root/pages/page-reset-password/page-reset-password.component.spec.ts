import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";

import { PageResetPasswordComponent } from './page-reset-password.component';

describe('PageResetPasswordComponent', () => {
  let component: PageResetPasswordComponent;
  let fixture: ComponentFixture<PageResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageResetPasswordComponent ], imports: [ HttpClientModule, FormsModule, ReactiveFormsModule, BrowserModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
