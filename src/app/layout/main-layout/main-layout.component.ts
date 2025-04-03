import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from '../../core/services/theme.service'; // Adjust path
import { Observable, Subject } from 'rxjs'; // Import Subject
import { takeUntil } from 'rxjs/operators'; // Import takeUntil
import { DisplaySettings } from '../../core/models/display-settings.model';
import { SettingsService } from '../../core/services/settings.service';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'; // Import MatSidenav
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'], // Link SCSS file
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    ToolbarComponent,
    SidenavComponent,
  ],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isDark$: Observable<boolean>;
  displaySettings$: Observable<DisplaySettings>;

  @ViewChild('sidenav') sidenav!: MatSidenav; // Reference to sidenav

  private _mobileQueryListener: () => void;
  private destroy$ = new Subject<void>(); // For unsubscribing

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private themeService: ThemeService,
    private settingsService: SettingsService // Inject SettingsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)'); // Adjust breakpoint if needed
    this._mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
      // Optional: Close sidenav if screen becomes non-mobile while it's open in 'over' mode
      if (
        !this.mobileQuery.matches &&
        this.sidenav &&
        this.sidenav.mode === 'over'
      ) {
        // this.sidenav.close(); // Decide if this behavior is desired
      }
    };
    // Use addEventListener for modern approach
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    this.isDark$ = this.themeService.isDark$;
    // Fetch settings once and handle potential errors
    this.displaySettings$ = this.settingsService.getDisplaySettings().pipe(
      takeUntil(this.destroy$)
      // catchError(err => {
      //     console.error("Failed to load display settings for layout", err);
      //     return of({ agency_name: 'App', bot_name: 'Bot' } as DisplaySettings); // Provide defaults
      // })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Use removeEventListener
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Optional: Handle sidenav state changes if needed
  onSidenavOpenedChange(isOpen: boolean): void {
    console.log('Sidenav open state:', isOpen);
  }
}
