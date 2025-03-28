# xof-calculator-admin-dashboard

## 1. Project Setup & Core Configuration (`ANGULAR`) Data driven !!!!!!!!!!!!!!!

- [ ] Create Angular project (`ng new`)
- [ ] Add Angular Material (`ng add @angular/material`)
- [ ] Create `src/app/core/data` folder
- [ ] Copy provided JSON data files into `src/app/core/data`
- [ ] Define Core Data Models/Interfaces (`src/app/core/models/`)
    - [ ] `BonusRule`
    - [ ] `CommissionSettings` (including `RoleSetting`, `UserOverrideSetting`)
    - [ ] `DisplaySettings`
    - [ ] `Earning` (with added `userId`)
    - [ ] `RolePercentageMap`
- [ ] Implement Core Services (`src/app/core/services/`)
    - [ ] `ThemeService` (Handles toggling, loading initial, localStorage)
    - [ ] `SettingsService` (Loads *mock* data for all config types from JSON)
    - [ ] `SettingsService` (Implements *mock* save methods for all config types - logs to console)
    - [ ] `EarningsService` (Flattens and loads *mock* earnings data from JSON)
    - [ ] `EarningsService` (Implements *mock* CRUD methods - logs/modifies local array)
- [ ] Configure Theming
    - [ ] Define custom light/dark palettes in `theme.scss`
    - [ ] Apply themes and global styles in `styles.scss`
- [ ] Configure Main App Module (`app.module.ts`) with necessary imports (Browser, Animations, HttpClient, Layout, Shared, Core Material)
- [ ] Configure Main App Routing (`app-routing.module.ts`) with layout and lazy-loading placeholders

## 2. Layout Implementation

- [ ] Create Layout Components (`MainLayout`, `Toolbar`, `Sidenav`)
- [ ] Implement `MainLayoutComponent` (Handles mobile query, integrates ThemeService, loads DisplaySettings for title)
- [ ] Implement `ToolbarComponent` (Displays dynamic title, theme toggle, sidenav toggle)
- [ ] Implement `SidenavComponent` (Displays navigation items with links/icons, basic active state)

## 3. Shared Module & Components

- [ ] Create `SharedModule`
- [ ] Create `ConfigCardComponent` (Handles title, loading state, content projection for actions/content)
- [ ] Configure `SharedModule` (Imports/exports Material modules, declares/exports `ConfigCardComponent`)

## 4. Feature: Dashboard

- [ ] Create `DashboardModule` and `DashboardPageComponent`
- [ ] Configure dashboard routing
- [ ] Implement `DashboardPageComponent` (Displays basic overview stats using *mock* service data)

## 5. Feature: Settings

- [ ] Create `SettingsModule` and configure base routing
- [ ] Create Settings Page Components (`CommissionSettingsPage`, `BonusRulesPage`, `DisplaySettingsPage`, `OtherConfigsPage`)
- [ ] Configure settings feature routing (linking paths to components)