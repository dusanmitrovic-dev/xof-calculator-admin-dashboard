# Vixen Calculator Admin Dashboard

## Completed Features (Version 0.0.1)

This section outlines the key features and enhancements implemented as part of the 1.0.0 release of the XOF Calculator Admin Dashboard.

### User Management

*   [x] User authentication system including login and logout functionality.
*   [x] Role-based access control (RBAC) with specific guards for admin and authenticated users.
*   [x] Automated JWT token injection into API requests for secure communication.
*   [x] User registration process.
*   [x] Comprehensive user listing with ability to view and manage user details.
*   [x] User editing functionality through a dedicated modal interface.
*   [x] Loading skeleton

### Guild Management

*   [x] Centralized management for guild configurations, allowing for listing, viewing, and modification.
*   [x] Ability to fetch and display guild members and roles, resolving Discord IDs to readable names.
*   [x] Ability to edit various guild configuration settings via a dedicated modal, including full configuration or specific sections like commission roles.
*   [x] Ability to delete entire guild configurations.
*   [x] Functionality to copy guild IDs to clipboard for easy reference.
*   [x] Specialized configuration management for MSP (Member Service Provider) settings within guilds.
*   [x] Buttons animation
*   [x] Edit modal show and disappear animations

### Earnings Management

*   [x] Fetching and displaying all earning records for a specific guild.
*   [x] Aggregated view of earnings across all guilds (for authorized roles like admin/manager).
*   [x] Filtering of earnings by text search, hours worked, gross revenue, and total cut.
*   [x] Sorting of earnings records by various columns (e.g., date, user, role, financial figures).
*   [x] Pagination of earnings records for better readability and performance.
*   [x] Creation of new earning records via a modal interface.
*   [x] Viewing and updating existing earning records through a dedicated modal.
*   [x] Deletion of earning records with confirmation.

### Dashboard Overview

*   [x] Interactive dashboard providing a summarized view of key application data.
*   [x] Integration of custom data to populate dashboard charts.

### Application Structure & Enhancements

*   [x] Established robust routing infrastructure for navigation.
*   [x] Implemented a modular application design for better organization and scalability.
*   [x] Default application layout defined, including a consistent header, footer, and navigation system.
*   [x] Improved error handling and loading indicators across data-intensive views.
*   [x] Alert Entrance/Exit animation (specifically within the User Edit Modal)

## Backend Features (Version 0.0.1)

This section details the backend features implemented in the 1.0.0 release.

### Core Infrastructure

*   [x] Initial project setup with Node.js, Express, and Mongoose.
*   [x] MongoDB connection configuration.
*   [x] Environment variable loading using `dotenv`.
*   [x] CORS middleware for frontend integration.
*   [x] Static file serving for the Angular admin dashboard.

### Authentication & Authorization System

*   [x] User registration endpoint: First registered user automatically assigned 'admin' role; subsequent users get 'user' role.
*   [x] User login endpoint, returning JWT token.
*   [x] JWT-based authentication middleware for protected routes.
*   [x] Role-Based Access Control (RBAC) with `admin` and `canManageGuild` middleware to secure routes based on user roles and managed guilds.
*   [x] Password hashing using `bcryptjs`.

### User Management Module

*   [x] API to fetch all users (admin only, password excluded).
*   [x] API to fetch a specific user by ID (admin only, password excluded).
*   [x] API to update user roles and assign/remove `managed_guild_ids` (admin only, with self-modification safeguards).
*   [x] API to delete users (admin only, with self-deletion safeguard).
*   [x] API to retrieve a list of all available guild IDs from existing configurations, for user assignment.
*   [x] Mongoose `User` model with `email`, `password`, `role`, and `managed_guild_ids` fields.

### Guild Configuration Management Module

*   [x] CRUD operations for guild-specific configurations.
*   [x] Support for managing `models`, `shifts`, `periods`, `bonus_rules`, `display_settings`, `commission_settings`, and `msp_settings` per guild.
*   [x] `GuildConfig` Mongoose model with schema validation.

### Earnings Tracking Module

*   [x] CRUD operations for earnings records.
*   [x] Authorization checks for earnings operations (admin or manager for that guild).
*   [x] `Earnings` Mongoose model to store detailed earning information.

### Guild Data (Members & Roles) Module

*   [x] API to fetch guild members for a given `guild_id`.
*   [x] API to fetch guild roles for a given `guild_id`.
*   [x] Mongoose models for `GuildMember` and `GuildRole` to store Discord-related guild data.

### Developer Experience

*   [x] `nodemon` for development auto-restarts.
*   [x] `express-validator` for basic request body validation.
*   [x] Improved error handling and console logging across controllers.
*   [x] Initial `CHANGELOG.md` and detailed `README.md`.

### Changes and Refinements

*   [x] Updated `README.md` and `CHANGELOG.md` to reflect full 1.0.0 feature set and improved documentation.
*   [x] Refactored `userController` and `authController` to consistently use `managed_guild_ids` array instead of the deprecated `managedGuilds` field.
*   [x] Refined error handling and console logging across controllers for better debugging and user feedback.
*   [x] Adjusted `configController.getAllGuildConfigs` to return a simplified list of `{id, name}` for frontend dropdowns.
*   [x] Ensured consistent handling of guild IDs as strings (Snowflake IDs) across all backend operations.
*   [x] Moved authorization logic into reusable middleware functions (`authMiddleware.js`) where appropriate.
