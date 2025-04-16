# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.26.0] - 2025-04-15

### Changed
- Refined UI and layout for `GuildConfigComponent` form sections (Models, Shifts, Periods, Bonus Rules, Display Settings).
- Used `mat-expansion-panel` for better organization.
- Improved styling for `mat-chip-listbox`, `FormArray` groups, and buttons.
- Added icons to expansion panel headers and buttons for clarity.
- Disabled save button when form is pristine (no changes made).
- Added visual feedback for save status (success/error/no changes).

## [0.25.0] - 2025-04-15

### Added
- Generated `UserEditDialogComponent` for editing user roles and managed guilds.
- Implemented reactive form in the dialog to modify user role and select managed guilds using `mat-selection-list`.
- Added logic to fetch all available guilds via `UserService` to populate selection list.
- Implemented save functionality to update user data via `UserService`.
- Added logic to disable role editing for the current admin user and disable guild selection for users with the 'admin' role.
- Updated `UserManagementComponent` to open the `UserEditDialogComponent` when the edit button is clicked.

## [0.24.0] - 2025-04-15

### Added
- Implemented initial `UserManagementComponent` (Admin Only):
  - Fetches all users via `UserService`.
  - Displays users in a `MatTable` with sorting, pagination, and filtering.
  - Shows email, role, and managed guilds (using `mat-chip-listbox`).
  - Includes action buttons for Edit (placeholder) and Delete.
  - Delete action includes basic confirmation and prevents self-deletion.
- Added `getUserIdFromToken()` helper method to `AuthService`.

## [0.23.0] - 2025-04-15

### Added
- Generated `EarningDialogComponent` for adding/editing earnings.
- Implemented reactive form in `EarningDialogComponent` with fields for earning details.
- Added logic to fetch dropdown options (shifts, periods, models, roles) from `ConfigService`.
- Implemented date parsing/formatting helpers.
- Added save logic to create or update earnings via `EarningsService`.
- Implemented dialog template (`earning-dialog.component.html`) with Material form fields.
- Updated `EarningsComponent` to open `EarningDialogComponent` for add/edit actions.
- Added `MatSnackBar` for user feedback on save/delete actions.

## [0.22.0] - 2025-04-15

### Added
- Implemented `EarningsService` for handling `/api/earnings` interactions (get, create, update, delete).
- Implemented initial `EarningsComponent` structure:
  - Includes `GuildSelectorComponent`.
  - Fetches earnings for the selected guild using `EarningsService`.
  - Displays earnings in a `MatTable` with sorting, pagination, and filtering.
  - Added placeholders for Add/Edit/Delete actions (dialogs to be implemented).
- Added required Material modules (`MatTable`, `MatPaginator`, `MatSort`, `MatDialog`, etc.) to `EarningsComponent` imports.

### Fixed
- Resolved SASS compilation errors in component SCSS files by removing local theme definitions and relying on CSS variables set by global theme.

## [0.21.1] - 2025-04-15

### Fixed
- Refactored `guild-config.component.scss` to remove local theme definitions and rely on global CSS theme variables, fixing SASS compilation errors and theme application issues.

## [0.21.0] - 2025-04-15

### Added
- Implemented reactive form structure in `GuildConfigComponent` based on fetched config data.
- Added helper methods for managing FormArrays (models, shifts, periods, bonus_rules).
- Implemented initial form population logic in `initConfigForm`.
- Implemented basic `saveConfig` function to send form data to the backend.
- Added initial HTML template (`guild-config.component.html`) to render the form using Material components (Expansion Panels, Chips, Inputs, Toggles).
- Added corresponding SCSS styles (`guild-config.component.scss`) for the form layout.
- Implemented `ConfigService` to handle API interactions for guild configurations.

### Changed
- `GuildConfigComponent` now attempts to build a default form structure if no config is found for a guild.
