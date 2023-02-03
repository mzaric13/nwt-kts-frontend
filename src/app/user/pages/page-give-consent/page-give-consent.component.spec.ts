import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGiveConsentComponent } from './page-give-consent.component';

describe('PageGiveConsentComponent', () => {
  let component: PageGiveConsentComponent;
  let fixture: ComponentFixture<PageGiveConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGiveConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGiveConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
