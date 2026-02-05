import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsDashborard } from './reviews-dashborard';

describe('ReviewsDashborard', () => {
  let component: ReviewsDashborard;
  let fixture: ComponentFixture<ReviewsDashborard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsDashborard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsDashborard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
