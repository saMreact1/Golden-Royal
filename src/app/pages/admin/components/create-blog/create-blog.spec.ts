import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlog } from './create-blog';

describe('CreateBlog', () => {
  let component: CreateBlog;
  let fixture: ComponentFixture<CreateBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
