import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AlertComponent,
  AlertHeadingDirective,
  AlertLinkDirective,
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TemplateIdDirective,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  imports: [
    AlertComponent,
    AlertHeadingDirective,
    AlertLinkDirective,
    ButtonCloseDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    TemplateIdDirective,
    TextColorDirective,
    ThemeDirective,
    IconDirective,
    DocsExampleComponent,
    RouterLink
  ],
  animations: [ 
    trigger('alertAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }), // Start off-screen to the right
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' })) // Slide out to the left
      ])
    ])
  ]
})
export class AlertsComponent implements OnInit {

  visible = [true, true];
  dismissible = true;

  constructor() { }

  ngOnInit(): void {
  }

  onAlertVisibleChange(eventValue: any = this.visible) {
    this.visible[1] = eventValue;
  }

  onResetDismiss() {
    this.visible = [true, true];
  }

  onToggleDismiss() {
    this.dismissible = !this.dismissible;
  }

}
