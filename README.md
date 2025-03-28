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
- [ ] Implement `CommissionSettingsPageComponent`
    - [ ] Use Reactive Forms (`FormGroup` nested for roles/users)
    - [ ] Load and display *mock* commission settings data
    - [ ] Implement basic add/remove controls for roles/users (modifies form)
    - [ ] Call *mock* `SettingsService.saveCommissionSettings` on submit
- [ ] Implement `BonusRulesPageComponent`
    - [ ] Use Reactive Forms (`FormArray` for rules)
    - [ ] Load and display *mock* bonus rules data
    - [ ] Implement add/remove controls for rules
    - [ ] Call *mock* `SettingsService.saveBonusRules` on submit (includes sorting)
- [ ] Implement `DisplaySettingsPageComponent`
    - [ ] Use Reactive Forms (`FormGroup`)
    - [ ] Load and display *mock* display settings data
    - [ ] Call *mock* `SettingsService.saveDisplaySettings` on submit
- [ ] Implement `OtherConfigsPageComponent`
    - [ ] Use Reactive Forms / appropriate controls for list management (Models, Periods, Shifts)
    - [ ] Use Reactive Forms / appropriate controls for Role Percentages map
    - [ ] Load and display *mock* data for all sections
    - [ ] Call respective *mock* save methods in `SettingsService` on submit

## 6. Feature: Earnings

- [ ] Create `EarningsModule` and `EarningsPageComponent`
- [ ] Configure earnings routing
- [ ] Implement `EarningsPageComponent`
    - [ ] Use `MatTable` with `MatTableDataSource`
    - [ ] Load `DisplaySettings` to determine `show_ids`
    - [ ] Dynamically set `displayedColumns` based on `show_ids`
    - [ ] Load and display flattened *mock* earnings data
    - [ ] Integrate `MatPaginator`
    - [ ] Integrate `MatSort` (with basic date sorting logic)
    - [ ] Implement client-side filter input
    - [ ] Include Edit/Delete buttons in 'actions' column
    - [ ] Call *mock* `EarningsService` edit/delete methods (using `confirm`/`alert`)

## 7. Next Steps / Pending Tasks

- [ ] **Backend Integration:** Replace ALL mock service calls (`of(...)`, `console.log`, `alert`) in `SettingsService` and `EarningsService` with actual `HttpClient` calls to the backend API endpoints.
- [ ] **Authentication:**
    - [ ] Implement `AuthService` (login, logout, token management).
    - [ ] Implement Login Page Component.
    - [ ] Implement `AuthGuard` to protect routes.
    - [ ] Implement HTTP Interceptor to add JWT token to API requests.
- [ ] **Earnings Table Enhancements:**
    - [ ] Implement server-side pagination, sorting, and filtering by modifying `EarningsService.getEarnings` to accept parameters and making the backend API support them.
    - [ ] Implement `MatDialog` for editing earning records with a dedicated form.
    - [ ] Implement `MatDialog` for confirming earning deletions.
- [ ] **Settings Enhancements:**
    - [ ] Implement `MatDialog` for adding new Roles/Users in Commission Settings instead of basic inputs.
- [ ] **UI/UX Refinements:**
    - [ ] Add more robust loading indicators (e.g., on buttons during save).
    - [ ] Improve form validation feedback.
    - [ ] Enhance error handling (display user-friendly messages from API errors).
    - [ ] Ensure responsiveness across various screen sizes is adequate.
- [ ] **Testing:** Implement unit tests for services and components. Consider integration/e2e tests.
- [ ] **CI/CD:** Set up automated build and deployment pipelines.
- [ ] **Documentation:** Add code comments and potentially generate documentation.