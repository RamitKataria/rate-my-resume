import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeReviewPageComponent } from './resume-review-page.component';

describe('ResumeReviewPageComponent', () => {
  let component: ResumeReviewPageComponent;
  let fixture: ComponentFixture<ResumeReviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeReviewPageComponent]
    });
    fixture = TestBed.createComponent(ResumeReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
