import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegisterDriverComponent } from './page-register-driver.component';

describe('PageRegisterDriverComponent', () => {
  let component: PageRegisterDriverComponent;
  let fixture: ComponentFixture<PageRegisterDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRegisterDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRegisterDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
