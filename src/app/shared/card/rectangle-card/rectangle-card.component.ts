import { Component, Input } from '@angular/core';
import { RectangleCardType } from './rectangle-card.model';

@Component({
  selector: 'ds-rectangle-card',
  templateUrl: './rectangle-card.component.html',
  standalone: true
})
export class RectangleCardComponent {
  @Input() card?: RectangleCardType;
}
