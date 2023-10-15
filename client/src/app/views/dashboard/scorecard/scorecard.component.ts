import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent {
  @Input({ required: true }) backgroundColorClass!: String;
  @Input({ required: true }) cardTitle!: String;
  @Input({ required: true }) cardSubtitle!: String;
}
