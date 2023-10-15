import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeReviewPageComponent } from './resume-review-page/resume-review-page.component';

const routes: Routes = [
  {
    path: '',
    component: ResumeReviewPageComponent,
    data: {
      title: 'Resume Review Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeReviewPageRoutingModule {
}