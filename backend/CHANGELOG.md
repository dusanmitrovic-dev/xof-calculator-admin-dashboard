# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-04-15

### Added

* Updated `getAvailableGuilds` to properly fetch guild ids.

## [0.2.0] - 2025-04-15

### Added

* User authentification and authorization.

## [0.1.0] - 2025-04-11

### Added

*   Initial project setup with Express and Mongoose.
*   MongoDB connection configuration (`config/db.js`).
*   Mongoose schemas for `GuildConfig` and `Earning` (`models/`).
*   Controllers for handling business logic (`controllers/`).
*   API routes for config and earnings (`routes/`).
*   Basic server setup (`server.js`).
*   CRUD endpoints for Guild Configurations (`/api/config`).
    *   GET all configs
    *   POST to create/update config
    *   GET specific guild config by `guild_id`
    *   DELETE specific guild config by `guild_id`
    *   GET specific config field (e.g., models, shifts) for a guild
    *   PUT to update specific config field for a guild
*   CRUD endpoints for Earnings (`/api/earnings`).
    *   GET all earnings for a specific guild
    *   POST to create an earning for a specific guild
    *   GET specific earning by its `_id`
    *   PUT to update specific earning by its `_id`
    *   DELETE specific earning by its `_id`
*   Basic `README.md` with setup instructions and endpoint list.
*   `.env` file for environment variables.
*   `package.json` with dependencies (express, mongoose, dotenv) and scripts (start, dev).
*   Basic error handling in controllers.
*   Added `nodemon` for development.
*   Added `CHANGELOG.md`.
*   Added testing examples using `curl` in `README.md`.
