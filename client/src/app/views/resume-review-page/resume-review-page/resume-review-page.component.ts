import { Component } from '@angular/core';

@Component({
  selector: 'app-resume-review-page',
  templateUrl: './resume-review-page.component.html',
  styleUrls: ['./resume-review-page.component.scss']
})
export class ResumeReviewPageComponent {
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
