import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageCardsComponent } from './profile-page-cards.component';

describe('ProfilePageCardsComponent', () => {
  let component: ProfilePageCardsComponent;
  let fixture: ComponentFixture<ProfilePageCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
