import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component'; // Import the toolbar

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,      // To display routed components
    ToolbarComponent   // Include the toolbar
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // Layout component logic can go here if needed (e.g., handling sidenav)
}
