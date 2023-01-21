import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChatListComponent } from './page-chat-list.component';

describe('PageChatListComponent', () => {
  let component: PageChatListComponent;
  let fixture: ComponentFixture<PageChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageChatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
