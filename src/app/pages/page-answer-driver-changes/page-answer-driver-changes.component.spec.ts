import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnswerDriverChangesComponent } from './page-answer-driver-changes.component';

describe('PageAnswerDriverChangesComponent', () => {
  let component: PageAnswerDriverChangesComponent;
  let fixture: ComponentFixture<PageAnswerDriverChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAnswerDriverChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAnswerDriverChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
