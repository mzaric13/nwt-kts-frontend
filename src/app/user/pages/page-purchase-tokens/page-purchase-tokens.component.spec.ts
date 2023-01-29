import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePurchaseTokensComponent } from './page-purchase-tokens.component';

describe('PagePurchaseTokensComponent', () => {
  let component: PagePurchaseTokensComponent;
  let fixture: ComponentFixture<PagePurchaseTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePurchaseTokensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePurchaseTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
