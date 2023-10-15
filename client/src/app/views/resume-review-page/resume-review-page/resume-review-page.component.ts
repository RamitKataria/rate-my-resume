import { Component } from '@angular/core';
import { DemoService } from 'src/services/demo.service'

@Component({
  selector: 'app-resume-review-page',
  templateUrl: './resume-review-page.component.html',
  styleUrls: ['./resume-review-page.component.scss']
})
export class ResumeReviewPageComponent {
  currResumeSrc: string;
  accuracy: string;
  
  constructor(
    private demoService: DemoService
  ) {
    this.currResumeSrc = demoService.getNextResumeSrc();
    this.accuracy = this.demoService.getAccuracy().toPrecision(3);
  }

  submitResume() {
    this.currResumeSrc = this.demoService.getNextResumeSrc();
    this.demoService.incrementResumesReviewed();
    this.demoService.updateAccuracy();
    this.accuracy = this.demoService.getAccuracy().toPrecision(3)
  }
}
