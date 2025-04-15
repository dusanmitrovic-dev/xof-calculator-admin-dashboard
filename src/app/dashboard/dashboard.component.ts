import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import necessary Material modules
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, // For navigation links
    MatCardModule // For basic styling
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // Updated extension
})
export class DashboardComponent {
  // Placeholder for dashboard logic (e.g., fetching stats)
}
