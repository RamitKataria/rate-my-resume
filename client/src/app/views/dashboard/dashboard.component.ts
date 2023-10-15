import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { DemoService } from 'src/services/demo.service';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-inner-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
  noOfReviewers: number = 0;
  noOfResumesReviewed: string;
  accuracy: string;

  constructor(
    private demoService: DemoService
  ) {
    this.noOfResumesReviewed = this.demoService.getResumesReviewed().toString();
    this.accuracy = parseFloat(this.demoService.getAccuracy().toString()).toFixed(2);
  }
}
