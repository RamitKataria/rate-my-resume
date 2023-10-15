import { Component } from '@angular/core';
import { DemoService } from 'src/services/demo.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  noOfResumesReviewed: number;

  constructor(
    private demoService: DemoService
  ) {
    this.noOfResumesReviewed = this.demoService.getResumesReviewed();
  }
}
