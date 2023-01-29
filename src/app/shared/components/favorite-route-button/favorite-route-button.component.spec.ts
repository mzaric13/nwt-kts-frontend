import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRouteButtonComponent } from './favorite-route-button.component';

describe('FavoriteRouteButtonComponent', () => {
  let component: FavoriteRouteButtonComponent;
  let fixture: ComponentFixture<FavoriteRouteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteRouteButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteRouteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
