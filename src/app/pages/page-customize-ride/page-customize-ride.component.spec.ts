import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCustomizeRideComponent } from './page-customize-ride.component';

describe('PageCustomizeRideComponent', () => {
  let component: PageCustomizeRideComponent;
  let fixture: ComponentFixture<PageCustomizeRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCustomizeRideComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCustomizeRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
