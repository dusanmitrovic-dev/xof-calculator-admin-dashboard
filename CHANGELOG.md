# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## [v0.17.0] – 2025-04-15

### Added
- Set up the routes:
  - The main application routes (dashboard, guild-config, earnings, user-management) are now grouped and protected by authGuard.
  - The user-management route is further protected by adminGuard.
  - The default path (/) after login redirects to /dashboard.
  - The wildcard route ** now redirects to /dashboard, relying on authGuard to send unauthenticated users to login.

## [v0.16.0] – 2025-04-15

### Added
- Configured Angular development proxy (`proxy.conf.json`) to forward `/api` requests to backend (`http://localhost:5000`).
- Updated `angular.json` serve configuration to use the proxy.

### Fixed
- Resolved CSS `@import` warnings by moving Material theme imports to the top level in `styles.css`.
- Updated `angular.json` styles configuration to only include `styles.css`.

## [v0.15.0] – 2025-04-15

### Added
- Implemented main application `LayoutComponent` containing `ToolbarComponent` and `<router-outlet>`.
- Implemented `ToolbarComponent` with app title, theme toggle (dark/light), and logout button.
- Added global CSS for theme switching (`.dark-theme`, `.light-theme`) in `styles.css`.
- Configured root `AppComponent` to conditionally display `LayoutComponent` only when logged in, otherwise display the router outlet for auth pages.

## [v0.14.0] – 2025-04-15

### Added
- Implemented functional `authGuard` to protect routes based on login status.
- Implemented functional `adminGuard` to protect routes based on login status and admin role.
- Guards redirect unauthenticated/unauthorized users to the login page or dashboard.

## [v0.13.0] – 2025-04-15

### Added
- Implemented `RegisterComponent`:
  - Reactive form with email, password, and confirm password.
  - Validation for required fields, email, password length, and password match (custom validator).
  - Integration with `AuthService` for registration.
  - Loading spinner and error display.
  - Material Design styling consistent with LoginComponent.
  - Link back to login page.

## [v0.12.0] – 2025-04-15

### Added
- Configured application routes (`app.routes.ts`) for auth components (`/auth/login`, `/auth/register`) using lazy loading.
- Added default route redirects for `/auth` and `/`.

### Changed
- Corrected ToastrService import issue in LoginComponent.

## [v0.11.0] – 2025-04-15

### Added
- The LoginComponent is now implemented with:
  - A reactive form for email and password with validation.
  - Integration with AuthService for the login request.
  - Loading state indication using MatProgressSpinner.
  - Password visibility toggle.
  - Error handling display.
  - Basic Material Design styling for a centered login card.
  - A link to the registration page.
  - Usage of modern Angular syntax (signal, @if block).

## [v0.10.0] – 2025-04-15

### Added
- `authInterceptor` implemented.

## [v0.9.0] – 2025-04-15

### Added
- AuthService is implemented. Key features:
  - Uses Angular's `HttpClient` for login/register API calls.
  - Stores the JWT in `localStorage`.
  - Uses `jwt-decode` to check token expiry and extract the user's role.
  - Provides signals (`isAuthenticated`, `currentUserRole`) for components/guards to react to auth state changes.
  - Includes methods like `logout`, `getToken`, `isLoggedIn`, `getUserRole`, `isAdmin`.

## [v0.8.0] – 2025-04-15

### Added
- basic components, services, guards, and interceptor files generated.

## [v0.7.0] – 2025-04-14

### Changed
- Completely redoing frontend.
- Will be using typescript.

## [v0.6.0] – 2025-04-05

### Changed
- Comment out header elements in various pages.

## [v0.5.0] – 2025-04-05

### Added
- Visual update.

## [v0.4.0] – 2025-04-03

### Added
- Implement models, periods, and shifts management with save functionality.

## [v0.3.0] – 2025-04-03

### Changed
- Enhance earnings data handling with improved ID generation and logging.

## [v0.2.0] – 2025-04-03

### Changed
- Enhance settings service with in-memory data handling for bonus rules, commission settings, display settings, models, periods, shifts, and role percentages.

## [v0.1.2] – 2025-04-01 

### Added
- Added `LICENCE.txt` file.

## [v0.1.1] – 2025-04-01 

### Changed
- Style theme toggle button and adjust alignment.

## [v0.1.0] – 2025-03-31  

### Added  
- **Theme & Layout**  
  - Set default theme to dark mode.
  - Implement theme toggle functionality in the toolbar.
  - Integrate Angular Material theming into the toolbar.
  - Enhance `main-layout` and `sidenav` components with Angular Material modules.
  - Mark `main-layout` and `sidenav` components as standalone.

- **Routing**  
  - Implement lazy loading for feature modules.  
  - Clean up and optimize route definitions.  

- **Dashboard**  
  - Implement `DashboardPageComponent` with:  
    - Data loading and statistics calculation.  
    - Loading spinner for better UX.  
    - Detailed statistics display with stat cards.  
  - Introduce `DashboardModule` with routing.  

- **Earnings**  
  - Add `EarningsModule` with:  
    - `EarningsPageComponent` for earnings display.  
    - Material components and `SharedModule` integration.  

- **Settings**  
  - Introduce `SettingsModule` with:  
    - `BonusRulesPageComponent`  
    - `CommissionSettingsPageComponent`  
    - `DisplaySettingsPageComponent`  
    - `OtherConfigsPageComponent`  
  - Implement dynamic forms and validation for Bonus Rules and Commission Settings pages.  

- **Shared Module**  
  - Enhance `SharedModule` with Angular Material and Reactive Forms support.  
  - Add `ConfigCardComponent` with:  
    - Input properties for title and loading state.  
    - Loading overlay styles.  

### Changed  
- Refactored `DashboardModule` to use `SharedModule` and Angular Material components.  
- Refactored `EarningsModule` to use `SharedModule` and include Material components.  
- Refactored `SettingsModule` to use `SharedModule` and include Material modules.  

### Fixed  
- Update import paths for correct service access in `DashboardPageComponent`.  
- Ensure `DashboardPageComponent` is non-standalone.  
- Change `ConfigCardComponent` to non-standalone.  
- Update `SharedModule` imports to include `ConfigCardComponent`.  
