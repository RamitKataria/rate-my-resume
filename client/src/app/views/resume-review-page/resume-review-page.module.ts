import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeReviewPageComponent } from './resume-review-page/resume-review-page.component';
import { ResumeReviewPageRoutingModule } from './resume-review-page-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ResumeReviewPageComponent,
  ],
  imports: [
    CommonModule,
    ResumeReviewPageRoutingModule,
    PdfViewerModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class ResumeReviewPageModule { }
platformBrowserDynamic().bootstrapModule(ResumeReviewPageModule);