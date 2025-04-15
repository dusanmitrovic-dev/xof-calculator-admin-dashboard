# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

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
- basic components, services, guards, and interceptor files generated

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
