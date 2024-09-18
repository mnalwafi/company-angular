import { Component, Input } from '@angular/core';
import { TitleCardType } from './title-card.model';

@Component({
  selector: 'ds-title-card',
  templateUrl: './title-card.component.html',
  standalone: true
})
export class TitleCardComponent {
  @Input() card?: TitleCardType;
}
