import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, startWith, shareReplay, catchError, tap } from 'rxjs/operators';

import {
  ColorModeService,
  ContainerComponent,
  // Removed unused imports
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  SidebarToggleDirective,
  DropdownModule,  // Includes dropdown components
  // Removed unused AvatarComponent, BadgeComponent, DropdownDividerDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { GuildConfigService, AvailableGuild } from '../../../services/guild-config.service'; // Adjusted path

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
    // Adjusted imports array
    imports: [
        CommonModule,
        ContainerComponent,
        HeaderTogglerDirective,
        SidebarToggleDirective,
        IconDirective,
        HeaderNavComponent,
        // Removed unused NavItemComponent, NavLinkDirective
        NgTemplateOutlet,
        DropdownModule, // Includes DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownHeaderDirective
        // Removed unused AvatarComponent, BadgeComponent, DropdownDividerDirective
    ],
    standalone: true // Ensure this component is standalone
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit, OnDestroy {

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  private guildConfigService = inject(GuildConfigService); // Inject GuildConfigService

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
            // Handle case where selectedId might not be in the list (e.g., initial load from storage)
            return selectedGuild ? selectedGuild.name : 'Select Guild';
        }),
        startWith('Select Guild') // Provide an initial value before observables emit
    );

     // Optional: Try to load persisted selection on init
     // const persistedGuildId = localStorage.getItem('selectedGuildId');
     // if (persistedGuildId) {
     //    this.guildConfigService.selectGuild(persistedGuildId);
     // }
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
      console.log('DefaultHeaderComponent: Destroyed.');
  }

  onGuildSelect(guildId: string | null): void {
      console.log('DefaultHeaderComponent: Guild selected:', guildId);
      this.guildConfigService.selectGuild(guildId);
  }


  // Keep existing properties/methods for other header features
  public newMessages = [
    {
      id: 0,
      from: 'Jessica Williams',
      avatar: '7.jpg',
      status: 'success',
      title: 'Urgent: System Maintenance Tonight',
      time: 'Just now',
      link: 'apps/email/inbox/message',
      // Fixed the string literal by escaping the single quote
      message: 'Attention team, we\'ll be conducting critical system maintenance tonight from 10 PM to 2 AM. Plan accordingly...'
    },
    {
      id: 1,
      from: 'Richard Johnson',
      avatar: '6.jpg',
      status: 'warning',
      title: 'Project Update: Milestone Achieved',
      time: '5 minutes ago',
      link: 'apps/email/inbox/message',
      // Fixed the string literal by escaping the single quote
      message: 'Kudos on hitting sales targets last quarter! Let\'s keep the momentum. New goals, new victories ahead...'
    },
    {
      id: 2,
      from: 'Angela Rodriguez',
      avatar: '5.jpg',
      status: 'danger',
      title: 'Social Media Campaign Launch',
      time: '1:52 PM',
      link: 'apps/email/inbox/message',
      message: 'Exciting news! Our new social media campaign goes live tomorrow. Brace yourselves for engagement...'
    },
    {
      id: 3,
      from: 'Jane Lewis',
      avatar: '4.jpg',
      status: 'info',
      title: 'Inventory Checkpoint',
      time: '4:03 AM',
      link: 'apps/email/inbox/message',
      // Fixed the string literal by escaping the single quote
      message: 'Team, it\'s time for our monthly inventory check. Accurate counts ensure smooth operations. Let\'s nail it...'
    },
    {
      id: 4, // Corrected duplicate id from 3 to 4
      from: 'Ryan Miller',
      avatar: '8.jpg', // Changed avatar to avoid duplicate with Jane Lewis (assuming different user)
      status: 'info',
      title: 'Customer Feedback Results',
      time: '3 days ago',
      link: 'apps/email/inbox/message',
      // Fixed the string literal by escaping the single quote
      message: 'Our latest customer feedback is in. Let\'s analyze and discuss improvements for an even better service...'
    }
  ];

  public newNotifications = [
    { id: 0, title: 'New user registered', icon: 'cilUserFollow', color: 'success' },
    { id: 1, title: 'User deleted', icon: 'cilUserUnfollow', color: 'danger' },
    { id: 2, title: 'Sales report is ready', icon: 'cilChartPie', color: 'info' },
    { id: 3, title: 'New client', icon: 'cilBasket', color: 'primary' },
    { id: 4, title: 'Server overloaded', icon: 'cilSpeedometer', color: 'warning' }
  ];

  public newStatus = [
    { id: 0, title: 'CPU Usage', value: 25, color: 'info', details: '348 Processes. 1/4 Cores.' },
    { id: 1, title: 'Memory Usage', value: 70, color: 'warning', details: '11444GB/16384MB' },
    { id: 2, title: 'SSD 1 Usage', value: 90, color: 'danger', details: '243GB/256GB' }
  ];

  public newTasks = [
    { id: 0, title: 'Upgrade NPM', value: 0, color: 'info' },
    { id: 1, title: 'ReactJS Version', value: 25, color: 'danger' },
    { id: 2, title: 'VueJS Version', value: 50, color: 'warning' },
    { id: 3, title: 'Add new layouts', value: 75, color: 'info' },
    { id: 4, title: 'Angular Version', value: 100, color: 'success' }
  ];

}
