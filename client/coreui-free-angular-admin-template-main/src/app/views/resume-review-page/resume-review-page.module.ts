import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeReviewPageComponent } from './resume-review-page/resume-review-page.component';
import { ResumeReviewPageRoutingModule } from './resume-review-page-routing.module'

@NgModule({
  declarations: [
    ResumeReviewPageComponent
  ],
  imports: [
    CommonModule,
    ResumeReviewPageRoutingModule
  ]
})
export class ResumeReviewPageModule { }
