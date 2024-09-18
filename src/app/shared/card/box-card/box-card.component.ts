import { Component, Input } from '@angular/core';
import { BoxCardType } from './box-card.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ds-box-card',
  templateUrl: './box-card.component.html',
  standalone: true,
  imports: [NgIf]
})
export class BoxCardComponent {
  @Input() card?: BoxCardType;
}
