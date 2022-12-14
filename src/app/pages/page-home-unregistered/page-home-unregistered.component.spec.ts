import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHomeUnregisteredComponent } from './page-home-unregistered.component';

describe('PageHomeUnregisteredComponent', () => {
  let component: PageHomeUnregisteredComponent;
  let fixture: ComponentFixture<PageHomeUnregisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHomeUnregisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHomeUnregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
