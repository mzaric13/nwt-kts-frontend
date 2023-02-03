import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTableComponent } from './chat-table.component';

describe('ChatTableComponent', () => {
  let component: ChatTableComponent;
  let fixture: ComponentFixture<ChatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
