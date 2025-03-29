import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from '../../core/services/theme.service'; // Adjust path
import { Observable, Subscription } from 'rxjs';
import { DisplaySettings } from '../../core/models/display-settings.model';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isDark$: Observable<boolean>;
  displaySettings$: Observable<DisplaySettings>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private themeService: ThemeService,
    private settingsService: SettingsService // Inject SettingsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isDark$ = this.themeService.isDark$;
    this.displaySettings$ = this.settingsService.getDisplaySettings(); // Fetch settings
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}