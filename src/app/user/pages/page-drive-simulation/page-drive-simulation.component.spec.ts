import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDriveSimulationComponent } from './page-drive-simulation.component';

describe('PageDriveSimulationComponent', () => {
  let component: PageDriveSimulationComponent;
  let fixture: ComponentFixture<PageDriveSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDriveSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDriveSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
