import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonDirective, IconDirective, RouterLink],
    animations: [
      trigger('buttonHover', [
        state('rest', style({
          transform: 'scale(1)'
        })),
        state('hover', style({
          transform: 'scale(1.05)'
        })),
        transition('rest <=> hover', [
          animate('100ms ease-in-out')
        ])
      ])
    ]
})
export class ButtonsComponent {

  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  buttonState: string = 'rest';

  onButtonHover(event: boolean) {
    this.buttonState = event ? 'hover' : 'rest';
  }
}
