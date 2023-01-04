import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBlockUsersComponent } from './table-block-users.component';

describe('TableBlockUsersComponent', () => {
  let component: TableBlockUsersComponent;
  let fixture: ComponentFixture<TableBlockUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBlockUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBlockUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
