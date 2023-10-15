import { Component } from '@angular/core';
import { DemoService } from 'src/services/demo.service';

@Component({
  selector: 'app-dashboard-uninitiated',
  templateUrl: './dashboard-uninitiated.component.html',
  styleUrls: ['./dashboard-uninitiated.component.scss']
})
export class DashboardUninitiatedComponent {
  noOfResumesReviewed: number;
  noOfResumesRemaining: number;

  constructor(
    private demoService: DemoService
  ) {
    this.noOfResumesReviewed = this.demoService.getResumesReviewed();
    this.noOfResumesRemaining = 3 - this.noOfResumesReviewed;
  }
}
