import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDriverDataChangesComponent } from './table-driver-data-changes.component';

describe('TableDriverDataChangesComponent', () => {
  let component: TableDriverDataChangesComponent;
  let fixture: ComponentFixture<TableDriverDataChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDriverDataChangesComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDriverDataChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
