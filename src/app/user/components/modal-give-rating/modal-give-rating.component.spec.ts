import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGiveRatingComponent } from './modal-give-rating.component';

describe('ModalGiveRatingComponent', () => {
  let component: ModalGiveRatingComponent;
  let fixture: ComponentFixture<ModalGiveRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGiveRatingComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGiveRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
