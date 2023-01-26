import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDriveSimulationComponent } from './map-drive-simulation.component';

describe('MapDriveSimulationComponent', () => {
  let component: MapDriveSimulationComponent;
  let fixture: ComponentFixture<MapDriveSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapDriveSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDriveSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
