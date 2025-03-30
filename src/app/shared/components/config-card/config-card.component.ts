import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-config-card',
  templateUrl: './config-card.component.html',
  styleUrls: ['./config-card.component.scss'],
  standalone: false,
})
export class ConfigCardComponent {
  @Input() title: string = 'Configuration';
  @Input() loading: boolean = false;
}
