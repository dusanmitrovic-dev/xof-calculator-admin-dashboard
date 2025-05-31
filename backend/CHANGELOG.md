# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-07-25 (Initial Stable Release)

### Added

*   **Core Infrastructure:**
    *   Initial project setup with Node.js, Express, and Mongoose.
    *   MongoDB connection configuration (`config/db.js`).
    *   Environment variable loading using `dotenv`.
    *   CORS middleware for frontend integration.
    *   Static file serving for the Angular admin dashboard.

*   **Authentication & Authorization System:**
    *   User registration endpoint (`POST /api/auth/register`): First registered user automatically assigned 'admin' role; subsequent users get 'user' role.
    *   User login endpoint (`POST /api/auth/login`), returning JWT token.
    *   JWT-based authentication middleware (`authMiddleware.js`) for protected routes.
    *   Role-Based Access Control (RBAC) with `admin` and `canManageGuild` middleware to secure routes based on user roles and managed guilds.
    *   Password hashing using `bcryptjs`.

*   **User Management Module:**
    *   API to fetch all users (`GET /api/users`) (admin only, password excluded).
    *   API to fetch a specific user by ID (`GET /api/users/:user_id`) (admin only, password excluded).
    *   API to update user roles and assign/remove `managed_guild_ids` (`PUT /api/users/:user_id`) (admin only, with self-modification safeguards).
    *   API to delete users (`DELETE /api/users/:user_id`) (admin only, with self-deletion safeguard).
    *   API to retrieve a list of all available guild IDs from existing configurations (`GET /api/users/managed-guilds/available`), for user assignment.
    *   Mongoose `User` model with `email`, `password`, `role`, and `managed_guild_ids` fields.

*   **Guild Configuration Management Module:**
    *   CRUD operations for guild-specific configurations (`/api/config` endpoints).
        *   `GET /api/config`: Get all guild configurations (simplified list for dropdown).
        *   `POST /api/config/:guild_id`: Create a new guild configuration or update an existing one.
        *   `GET /api/config/:guild_id`: Get the full configuration for a specific guild.
        *   `DELETE /api/config/:guild_id`: Delete the configuration for a specific guild.
        *   `GET /api/config/:guild_id/:field`: Get a specific field (e.g., `models`, `shifts`, `display_settings`) from a guild's configuration.
        *   `PUT /api/config/:guild_id/:field`: Update a specific field in a guild's configuration.
    *   Support for managing `models`, `shifts`, `periods`, `bonus_rules`, `display_settings`, `commission_settings`, and `msp_settings` per guild.
    *   `GuildConfig` Mongoose model with schema validation.

*   **Earnings Tracking Module:**
    *   CRUD operations for earnings records (`/api/earnings` endpoints).
        *   `GET /api/earnings/:guild_id`: Get all earnings for a specific guild.
        *   `POST /api/earnings/:guild_id`: Create a new earning record for a specific guild.
        *   `GET /api/earnings/entry/:custom_id`: Get a specific earning record by its custom `id`.
        *   `PUT /api/earnings/entry/:custom_id`: Update a specific earning record by its custom `id`.
        *   `DELETE /api/earnings/entry/:custom_id`: Delete a specific earning record by its custom `id`.
    *   Authorization checks for earnings operations (admin or manager for that guild).
    *   `Earnings` Mongoose model to store detailed earning information (`id`, `guild_id`, `date`, `total_cut`, `gross_revenue`, `period`, `shift`, `role`, `models`, `hours_worked`, `user_mention`).

*   **Guild Data (Members & Roles) Module:**
    *   API to fetch guild members for a given `guild_id` (`GET /api/guilds/members/:guildId`).
    *   API to fetch guild roles for a given `guild_id` (`GET /api/guilds/roles/:guildId`).
    *   Mongoose models for `GuildMember` and `GuildRole` to store Discord-related guild data.

*   **Developer Experience:**
    *   `nodemon` for development auto-restarts.
    *   `express-validator` for basic request body validation.
    *   Improved error handling and console logging across controllers.
    *   Initial `CHANGELOG.md` and detailed `README.md`.

### Changed

*   Updated `README.md` and `CHANGELOG.md` to reflect full 1.0.0 feature set and improved documentation.
*   Refactored `userController` and `authController` to consistently use `managed_guild_ids` array instead of the deprecated `managedGuilds` field.
*   Refined error handling and console logging across controllers for better debugging and user feedback.
*   Adjusted `configController.getAllGuildConfigs` to return a simplified list of `{id, name}` for frontend dropdowns.
*   Ensured consistent handling of guild IDs as strings (Snowflake IDs) across all backend operations.
*   Moved authorization logic into reusable middleware functions (`authMiddleware.js`) where appropriate.

### Removed

*   Deprecated `managedGuilds` field from the `User` model, replaced by `managed_guild_ids`.
