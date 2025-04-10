# xof-calculator-admin-dashboard

## 1. Project Setup & Core Configuration (`ANGULAR`) Data driven !!!!!!!!!!!!!!!

- [x] Create Angular project (`ng new`)
- [x] Add Angular Material (`ng add @angular/material`)
- [x] Create `src/app/core/data` folder
- [x] Copy provided JSON data files into `src/app/core/data`
- [x] Define Core Data Models/Interfaces (`src/app/core/models/`)
    - [x] `BonusRule`
    - [x] `CommissionSettings` (including `RoleSetting`, `UserOverrideSetting`)
    - [x] `DisplaySettings`
    - [x] `Earning` (with added `userId`)
    - [x] `RolePercentageMap`
    - [ ] 
- [x] Implement Core Services (`src/app/core/services/`)
    - [x] `ThemeService` (Handles toggling, loading initial, localStorage)
    - [x] `SettingsService` (Loads *mock* data for all config types from JSON)
    - [x] `SettingsService` (Implements *mock* save methods for all config types - logs to console)
    - [x] `EarningsService` (Flattens and loads *mock* earnings data from JSON)
    - [x] `EarningsService` (Implements *mock* CRUD methods - logs/modifies local array)
- [x] Configure Theming
- [ ] 
    - [x] Define custom light/dark palettes in `theme.scss`
    - [x] Apply themes and global styles in `styles.scss`
    - [ ] 
- [x] Configure Main App Module (`app.module.ts`) with necessary imports (Browser, Animations, HttpClient, Layout, Shared, Core Material)
- [ ] 
- [x] Configure Main App Routing (`app-routing.module.ts`) with layout and lazy-loading placeholders
- [ ] Fix the sidebar toggle functionality.
- [ ] Ensure responsiveness for mobile devices.
- [ ] Verify navigation links and their functionality.
- [ ] Adjust styles for better alignment and spacing.

## 2. Layout Implementation

- [x] Create Layout Components (`MainLayout`, `Toolbar`, `Sidenav`)
- [x] Implement `MainLayoutComponent` (Handles mobile query, integrates ThemeService, loads DisplaySettings for title)
- [x] Implement `ToolbarComponent` (Displays dynamic title, theme toggle, sidenav toggle)
- [x] Implement `SidenavComponent` (Displays navigation items with links/icons, basic active state)
- [ ] Ensure the form loads and saves settings correctly.
- [ ] Fix validation and pristine state handling.
- [ ] Test the onSubmit method for proper error handling and success messages.
- [ ] Verify the form layout and ensure all fields are displayed correctly.
- [ ] Fix alignment and spacing issues for form fields and toggles.
- [ ] Ensure the page is fully responsive, especially on Android devices.

## 3. Shared Module & Components

- [x] Create `SharedModule`
- [x] Create `ConfigCardComponent` (Handles title, loading state, content projection for actions/content)
- [x] Configure `SharedModule` (Imports/exports Material modules, declares/exports `ConfigCardComponent`)
- [ ] Verify the getDisplaySettings and saveDisplaySettings methods.
- [ ] Ensure mock data is being fetched and saved correctly.
- [ ] Replace mock methods with actual API calls if a backend is available.

## 4. Feature: Dashboard

- [x] Create `DashboardModule` and `DashboardPageComponent`
- [x] Configure dashboard routing
- [x] Implement `DashboardPageComponent` (Displays basic overview stats using *mock* service data)
- [ ] Verify all necessary modules and components are imported.
- [ ] Ensure the SettingsModule and other feature modules are correctly configured.

## 5. Feature: Settings

- [x] Create `SettingsModule` and configure base routing
- [x] Create Settings Page Components (`CommissionSettingsPage`, `BonusRulesPage`, `DisplaySettingsPage`, `OtherConfigsPage`)
- [x] Configure settings feature routing (linking paths to components)
- [x] Implement `CommissionSettingsPageComponent`
    - [x] Use Reactive Forms (`FormGroup` nested for roles/users)
    - [x] Load and display *mock* commission settings data
    - [x] Implement basic add/remove controls for roles/users (modifies form)
    - [x] Call *mock* `SettingsService.saveCommissionSettings` on submit
- [x] Implement `BonusRulesPageComponent`
    - [x] Use Reactive Forms (`FormArray` for rules)
    - [x] Load and display *mock* bonus rules data
    - [x] Implement add/remove controls for rules
    - [x] Call *mock* `SettingsService.saveBonusRules` on submit (includes sorting)
- [x] Implement `DisplaySettingsPageComponent`
    - [x] Use Reactive Forms (`FormGroup`)
    - [x] Load and display *mock* display settings data
    - [x] Call *mock* `SettingsService.saveDisplaySettings` on submit
- [x] Implement `OtherConfigsPageComponent`
    - [x] Use Reactive Forms / appropriate controls for list management (Models, Periods, Shifts)
    - [x] Use Reactive Forms / appropriate controls for Role Percentages map
    - [x] Load and display *mock* data for all sections
    - [x] Call respective *mock* save methods in `SettingsService` on submit
- [ ] Update the documentation to reflect the current state of the project.
- [ ] Add notes about pending tasks and known issues.

## 6. Feature: Earnings

- [x] Create `EarningsModule` and `EarningsPageComponent`
- [x] Configure earnings routing
- [x] Implement `EarningsPageComponent`
    - [x] Use `MatTable` with `MatTableDataSource`
    - [x] Load `DisplaySettings` to determine `show_ids`
    - [x] Dynamically set `displayedColumns` based on `show_ids`
    - [x] Load and display flattened *mock* earnings data
    - [x] Integrate `MatPaginator`
    - [x] Integrate `MatSort` (with basic date sorting logic)
    - [x] Implement client-side filter input
    - [x] Include Edit/Delete buttons in 'actions' column
    - [x] Call *mock* `EarningsService` edit/delete methods (using `confirm`/`alert`)
- [ ] Ensure all pages are mobile-friendly and work well on Android devices.
- [ ] Add proper error messages and loading indicators where necessary.
- [ ] Test all pages and components for functionality and fix any issues.
- [ ] Refine the design and layout for better user experience.

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
- [ ] Replace mock service calls with actual API calls.
- [ ] Implement login, logout, and route protection.
- [ ] Add server-side pagination, sorting, and filtering for the earnings table.
- [ ] Use dialogs for adding new roles/users in commission settings.
- [ ] Add robust loading indicators and improve form validation feedback.
- [ ] Implement unit tests for services and components.
- [ ] Set up automated build and deployment pipelines.

`note: Use Mongo DB Atlas M0 512mb free tier cloud database.`
