import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, startWith, shareReplay, catchError, tap } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

import {
  ColorModeService,
  ContainerComponent,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  SidebarToggleDirective,
  DropdownModule,
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { GuildConfigService, AvailableGuild } from '../../../services/guild-config.service'; // Adjusted path
import { AuthService } from '../../../auth/auth.service'; // Import AuthService
import { TitleService } from '../../../services/title.service'; // Import TitleService
import { DefaultLayoutComponent } from '..';

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
    imports: [
        CommonModule,
        ContainerComponent,
        HeaderTogglerDirective,
        SidebarToggleDirective,
        IconDirective,
        HeaderNavComponent,
        NgTemplateOutlet,
        DropdownModule,
    ],
    standalone: true,
    animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms ease', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('300ms ease', style({ opacity: 0 }))
        ])
      ])
    ]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit, OnDestroy {

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  private guildConfigService = inject(GuildConfigService);
  private authService = inject(AuthService); // Inject AuthService
  private router = inject(Router); // Inject Router
  private titleService = inject(TitleService); // Inject TitleService

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  // Guild Selection Observables
  availableGuilds$!: Observable<AvailableGuild[]>;
  selectedGuildId$!: Observable<string | null>;
  selectedGuildName$!: Observable<string>;
  guildLoadingError: string | null = null;

  private subscriptions = new Subscription();


  constructor() {
    super();
    this.selectedGuildId$ = this.guildConfigService.selectedGuildId$;
  }

  sidebarId = input('sidebar1');

  ngOnInit(): void {
    console.log('DefaultHeaderComponent: Initializing...');
    this.availableGuilds$ = this.guildConfigService.getAvailableGuilds().pipe(
        tap(guilds => console.log(`DefaultHeaderComponent: Received ${guilds.length} guilds.`)),
        catchError(error => {
            console.error('DefaultHeaderComponent: Error fetching guilds:', error);
            this.guildLoadingError = `Error loading guilds: ${error.message || 'Unknown error'}`;
            return []; // Return empty array on error to prevent breaking the UI
        }),
        shareReplay(1) // Cache the result and share among subscribers
    );

    this.selectedGuildName$ = combineLatest([
        this.selectedGuildId$,
        this.availableGuilds$ // Make sure availableGuilds$ emits at least once
    ]).pipe(
        map(([selectedId, guilds]) => {
            if (!selectedId || guilds.length === 0) {
                return 'Select Guild';
            }
            const selectedGuild = guilds.find(g => g.id === selectedId);
            return selectedGuild ? selectedGuild.name : 'Select Guild';
        }),
        startWith('Select Guild') // Provide an initial value before observables emit
    );

    // Set initial title and favicon when component initializes
    this.titleService.setTitle('Guild Application');
    this.titleService.setFavicon(''); // Clear existing favicon if any
    DefaultLayoutComponent.setCurrentGuildConfig({ logo_image_base64: '', logo_text: 'Guild Application' });
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
      console.log('DefaultHeaderComponent: Destroyed.');
  }

  onGuildSelect(guildId: string | null): void {
      console.log('DefaultHeaderComponent: Guild selected:', guildId);
      this.guildConfigService.selectGuild(guildId);
      if (guildId) {
        const selectedGuildConfig$ = this.guildConfigService.getGuildConfig(guildId);
        const sub = selectedGuildConfig$.subscribe(selectedGuild => {
          console.log(selectedGuild);
          if (selectedGuild) {
            DefaultLayoutComponent.setCurrentGuildConfig({
              logo_image_base64:
                selectedGuild.display_settings?.logo_image_base64 || '',
              logo_text: selectedGuild.display_settings?.logo_text || 'Guild Application',
            });
            // Use the TitleService to set the title
            this.titleService.setTitle(selectedGuild.display_settings?.logo_text || 'Guild Application');
            // Use the TitleService to set the favicon
            if (selectedGuild.display_settings?.logo_image_base64) {
              this.titleService.setFavicon(selectedGuild.display_settings.logo_image_base64);
            } else {
              this.titleService.setFavicon(''); // Clear favicon if no image for selected guild
            }
            console.log('DefaultHeaderComponent: Current guild config set:', DefaultLayoutComponent.currentGuildConfig);
            // this.router.navigate(['/dashboard']); // Redirect to dashboard or appropriate page
          }
        });
        this.subscriptions.add(sub);
      } else {
        // If no guild is selected (guildId is null)
        DefaultLayoutComponent.setCurrentGuildConfig({ logo_image_base64: '', logo_text: 'Guild Application' });
        this.titleService.setTitle('Guild Application');
        this.titleService.setFavicon(''); // Clear favicon
      }
  }

  /**
   * Logs the user out and redirects to the login page.
   */
  logout(): void {
    console.log('DefaultHeaderComponent: Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }

  get currentGuildConfig() {
    return DefaultLayoutComponent.currentGuildConfig;
  }

}
