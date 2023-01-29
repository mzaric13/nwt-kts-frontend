import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLiveChatComponent } from './page-live-chat.component';

describe('PageLiveChatComponent', () => {
  let component: PageLiveChatComponent;
  let fixture: ComponentFixture<PageLiveChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLiveChatComponent ], imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
