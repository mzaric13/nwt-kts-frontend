import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePassengerProfileComponent } from './page-passenger-profile.component';

describe('PagePassengerProfileComponent', () => {
  let component: PagePassengerProfileComponent;
  let fixture: ComponentFixture<PagePassengerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePassengerProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePassengerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
