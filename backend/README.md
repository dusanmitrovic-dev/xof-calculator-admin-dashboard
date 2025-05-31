# XOF Calculator Admin Dashboard - Backend API
A Node.js backend API server using Express and MongoDB (Mongoose) to manage configurations, earnings, and user access for Discord guilds. This API serves as the data backbone for the XOF Calculator Admin Dashboard frontend.
## Table of Contents
*   [Features](#features)
*   [Project Structure](#project-structure)
*   [Prerequisites](#prerequisites)
*   [Installation](#installation)
*   [Running the Server](#running-the-server)
*   [API Endpoints](#api-endpoints)
    *   [Authentication (`/api/auth`)](#authentication-apiauth)
    *   [Users (`/api/users`)](#users-apiusers)
    *   [Guild Configurations (`/api/config`)](#guild-configurations-apiconfig)
    *   [Earnings (`/api/earnings`)](#earnings-apiearnings)
    *   [Guild Data (Members & Roles) (`/api/guilds`)](#guild-data-members--roles-apiguilds)
*   [Authentication & Authorization](#authentication--authorization)
*   [Error Handling](#error-handling)
*   [TODO / Potential Improvements](#todo--potential-improvements)
## Features
This backend provides the following core functionalities:
*   **Authentication & Authorization:** Secure user registration, login, and role-based access control (RBAC) with JWT for API protection.
*   **User Management:** Comprehensive management of user accounts, including roles (admin, manager, user) and assigning specific guilds that managers can oversee.
*   **Guild Configuration:** CRUD operations for storing and retrieving various guild-specific settings like commission rules, display options, shifts, models, and bonus structures.
*   **Earnings Tracking:** Full CRUD capabilities for recording and managing detailed earning entries for guild members.
*   **Guild Data Provision:** Endpoints to provide lists of guild members and roles (from cached Discord data, if available, or direct fetches from a Discord bot interacting with the API).
## Project Structure
```
.
├── .env                            # Environment variables (MongoDB URI, JWT Secret, Port, etc.)
├── config/
│   └── db.js                       # MongoDB connection logic
├── controllers/                    # Contains business logic for handling API requests
│   ├── authController.js           # Handles user registration and login
│   ├── configController.js         # Handles guild configuration CRUD
│   ├── earningController.js        # Handles earnings record CRUD
│   ├── guildController.js          # Handles fetching guild members and roles
│   └── userController.js           # Handles user management (get, update, delete users)
├── middleware/                     # Custom Express middleware
│   └── authMiddleware.js           # JWT authentication and authorization checks
├── models/                         # Mongoose schemas and models for MongoDB documents
│   ├── Earnings.js                 # Defines the schema for earning records
│   ├── GuildConfig.js              # Defines the schema for guild configurations
│   ├── GuildMember.js              # Defines the schema for cached guild members
│   ├── GuildRole.js                # Defines the schema for cached guild roles
│   └── User.js                     # Defines the schema for user accounts
├── routes/                         # Defines API endpoints and links them to controllers
│   ├── authRoutes.js               # Authentication related routes
│   ├── configRoutes.js             # Guild configuration routes
│   ├── earningRoutes.js            # Earnings related routes
│   ├── guildRoutes.js              # Guild member and role routes
│   └── userRoutes.js               # User management routes
├── server.js                       # Main application entry point, sets up Express app
├── package.json                    # Project dependencies and scripts
├── CHANGELOG.md                    # Record of changes for the backend API
└── README.md                       # This file
```
## Prerequisites
Before running the backend, ensure you have the following installed:
*   **Node.js:** (v18 or higher recommended)
*   **npm** or **yarn**
*   **MongoDB instance:** (local, MongoDB Atlas, or another cloud provider)
## Installation
1.  **Navigate to the backend directory:**
    ```bash
    cd xof-calculator-admin-dashboard/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    *   Create a `.env` file in the `xof-calculator-admin-dashboard/backend` directory.
    *   Add the following variables. Replace placeholders with your actual values:
        ```env
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<a_strong_secret_key_for_jwt_signing>
        PORT=5000
        FRONTEND_ORIGINS=http://localhost:4200,http://another-frontend-domain.com # Comma-separated list of allowed frontend origins for CORS
        ```
    *   **`MONGO_URI`**: Your MongoDB connection string (e.g., `mongodb://localhost:27017/xof_calculator_db` or a MongoDB Atlas URI).
    *   **`JWT_SECRET`**: A long, random string. You can generate one using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
    *   **`PORT`**: The port the backend server will listen on (default: `5000`).
    *   **`FRONTEND_ORIGINS`**: A comma-separated list of origins that are allowed to make requests to this backend. This is crucial for CORS configuration.
## Running the Server
1.  **Navigate to the backend directory:**
    ```bash
    cd xof-calculator-admin-dashboard/backend
    ```
2.  **To run in development mode (with automatic restarts on file changes):**
    ```bash
    npm run dev
    ```
3.  **To run in production mode:**
    ```bash
    npm start
    ```
The server will start on the port specified in your `.env` file (default is `5000`). The default base URL for the API will be `http://localhost:5000/api`.
## API Endpoints
**Base URL for all API endpoints:** `/api`
### Authentication (`/api/auth`)
*   `POST /api/auth/register`
    *   **Description:** Registers a new user. The first user registered automatically becomes an 'admin'.
    *   **Body:** `{ "email": "string", "password": "string" }`
    *   **Response:** `{ "token": "string" }` (JWT)
*   `POST /api/auth/login`
    *   **Description:** Logs in an existing user.
    *   **Body:** `{ "email": "string", "password": "string" }`
    *   **Response:** `{ "token": "string" }` (JWT)
### Users (`/api/users`)
*   **Authentication:** Requires JWT. Most endpoints require `admin` role.
*   `GET /api/users`
    *   **Description:** Get all registered users (excluding passwords).
    *   **Access:** Admin Only
    *   **Response:** `Array<User>`
*   `GET /api/users/:user_id`
    *   **Description:** Get a specific user by their MongoDB `_id` (excluding password).
    *   **Access:** Admin Only
    *   **Response:** `User` object
*   `PUT /api/users/:user_id`
    *   **Description:** Update a user's role and/or `managed_guild_ids`.
    *   **Access:** Admin Only (cannot modify own role or assign managed guilds to self if admin).
    *   **Body:** `{ "role": "admin" | "manager" | "user", "managed_guild_ids": ["string"] }`
    *   **Response:** Updated `User` object
*   `DELETE /api/users/:user_id`
    *   **Description:** Delete a user.
    *   **Access:** Admin Only (cannot delete self).
    *   **Response:** `{ "msg": "User deleted" }`
*   `GET /api/users/managed-guilds/available`
    *   **Description:** Get a list of all unique guild IDs present in existing configurations.
    *   **Access:** Admin Only
    *   **Response:** `Array<string>` (e.g., `["guildId1", "guildId2"]`)
### Guild Configurations (`/api/config`)
*   **Authentication:** Requires JWT. `canManageGuild` middleware applied.
*   `GET /api/config`
    *   **Description:** Get a simplified list of all guild configurations (ID and display name).
    *   **Access:** Authenticated Users (managers see only their managed guilds)
    *   **Response:** `Array<{ id: string, name: string }>`
*   `POST /api/config/:guild_id`
    *   **Description:** Create a new guild configuration or update an existing one for the given `guild_id`.
    *   **Access:** Admin or Manager for the specific `guild_id`
    *   **Body:** Full `GuildConfig` object (partial updates require `PUT` on specific fields).
    *   **Response:** Created/Updated `GuildConfig` object
*   `GET /api/config/:guild_id`
    *   **Description:** Get the full configuration object for a specific guild.
    *   **Access:** Admin or Manager for the specific `guild_id`
    *   **Response:** `GuildConfig` object
*   `DELETE /api/config/:guild_id`
    *   **Description:** Delete the entire configuration for a specific guild.
    *   **Access:** Admin Only
    *   **Response:** `{ "msg": "Config deleted successfully" }`
*   `GET /api/config/:guild_id/:field`
    *   **Description:** Get a specific field (e.g., `models`, `shifts`, `display_settings`) from a guild's configuration.
    *   **Access:** Admin or Manager for the specific `guild_id`
    *   **Response:** `{ "<field_name>": <field_value> }`
*   `PUT /api/config/:guild_id/:field`
    *   **Description:** Update a specific field in a guild's configuration.
    *   **Access:** Admin or Manager for the specific `guild_id`
    *   **Body:** `{ "value": <new_value> }`
    *   **Response:** Updated `GuildConfig` object
### Earnings (`/api/earnings`)
*   **Authentication:** Requires JWT. `canManageGuild` middleware applied.
*   `GET /api/earnings/:guild_id`
    *   **Description:** Get all earnings records for a specific guild.
    *   **Access:** Admin or Manager for the specific `guild_id`
    *   **Response:** `Array<Earning>`
*   `POST /api/earnings/:guild_id`
    *   **Description:** Create a new earning record for a specific guild. Requires a unique `id` for the earning.
    *   **Access:** Admin or Manager for the specific `guild_id`
    *   **Body:** `Earning` object (excluding `_id`)
    *   **Response:** Created `Earning` object
*   `GET /api/earnings/entry/:custom_id`
    *   **Description:** Get a specific earning record by its custom `id` (not MongoDB `_id`).
    *   **Access:** Admin or Manager for the earning's `guild_id`
    *   **Response:** `Earning` object
*   `PUT /api/earnings/entry/:custom_id`
    *   **Description:** Update a specific earning record by its custom `id`.
    *   **Access:** Admin or Manager for the earning's `guild_id`
    *   **Body:** `Partial<Earning>` object with fields to update (cannot update `id` or `guild_id`).
    *   **Response:** Updated `Earning` object
*   `DELETE /api/earnings/entry/:custom_id`
    *   **Description:** Delete a specific earning record by its custom `id`.
    *   **Access:** Admin or Manager for the earning's `guild_id`
    *   **Response:** `{ "msg": "Earning removed" }`
### Guild Data (Members & Roles) (`/api/guilds`)
*   **Authentication:** Requires JWT. `canManageGuild` middleware applied.
*   `GET /api/guilds/members/:guildId`
    *   **Description:** Get all cached guild members for a given `guildId`.
    *   **Access:** Admin or Manager for the specific `guildId`
    *   **Response:** `Array<GuildMember>`
*   `GET /api/guilds/roles/:guildId`
    *   **Description:** Get all cached guild roles for a given `guildId`.
    *   **Access:** Admin or Manager for the specific `guildId`
    *   **Response:** `Array<GuildRole>`
## Authentication & Authorization
This API uses JWT (JSON Web Tokens) for authentication and implements a role-based access control (RBAC) system:
*   **Roles:**
    *   `admin`: Has full access to all API endpoints and can manage all users and guilds.
    *   `manager`: Can manage guild configurations and earnings only for the `guild_id`s listed in their `managed_guild_ids` array.
    *   `user`: Limited access (currently, only login is available). Further granular permissions can be added.
*   **Flow:**
    1.  Users `register` or `login` to receive a JWT.
    2.  This JWT must be sent in the `Authorization` header as a `Bearer` token for all protected API calls.
    3.  The `authMiddleware.js` verifies the token and attaches user information (ID, role, managed guilds) to the request object (`req.user`).
    4.  Specific route handlers or additional middleware (`canManageGuild`) then check `req.user.role` and `req.user.managed_guild_ids` to enforce authorization rules.
## Error Handling
The API provides basic error handling for common scenarios:
*   **400 Bad Request:** For invalid input data (e.g., missing fields, validation errors).
*   **401 Unauthorized:** If no valid JWT is provided or the token is expired/invalid.
*   **403 Forbidden:** If the authenticated user does not have the necessary permissions to access a resource or perform an action.
*   **404 Not Found:** If a requested resource (e.g., user, guild config, earning) does not exist.
*   **500 Server Error:** For unexpected server-side issues.
Errors are logged to the console, and a generic error message is returned to the client to avoid exposing sensitive internal details.
## TODO / Potential Improvements
*   **Input Validation:** Implement more robust and detailed input validation (e.g., for data types, formats, ranges) using `express-validator` where currently only basic checks exist.
*   **Comprehensive Logging:** Implement a more sophisticated logging solution (e.g., Winston, Morgan) for production environments, including request logging, error logging, and performance metrics.
*   **Automated Testing:** Develop a comprehensive suite of unit, integration, and end-to-end tests (e.g., using Jest, Supertest, Mocha, Chai) to ensure API reliability and prevent regressions.
*   **API Documentation Automation:** Integrate tools like Swagger/OpenAPI to automatically generate and host interactive API documentation from code comments or route definitions.
*   **Rate Limiting:** Implement rate limiting to protect against abuse and brute-force attacks on authentication and other endpoints.
*   **Security Enhancements:** Add more security headers, consider CSRF protection for relevant endpoints, and ensure proper data sanitization.
*   **Database Indexes:** Review and add appropriate MongoDB indexes to frequently queried fields for performance optimization.
*   **Environment-Specific Configurations:** Formalize configuration management for different environments (development, staging, production).
*   **Health Checks:** Add a `/health` or `/status` endpoint for monitoring application health.
*   **Advanced Guild Data Sync:** Implement a more robust mechanism for syncing Discord guild members and roles (e.g., webhooks, periodic sync jobs) rather than relying solely on manual updates or first-time fetches.


# XOF Calculator Backend

## Completed Features (Version 1.0.0)

This section outlines the key features and enhancements implemented as part of the 1.0.0 release of the XOF Calculator Backend.

### Core Infrastructure

*   [x] Initial project setup with Node.js, Express, and Mongoose.
*   [x] MongoDB connection configuration (`config/db.js`).
*   [x] Environment variable loading using `dotenv`.
*   [x] CORS middleware for frontend integration.
*   [x] Static file serving for the Angular admin dashboard.

### Authentication & Authorization System

*   [x] User registration endpoint (`POST /api/auth/register`): First registered user automatically assigned 'admin' role; subsequent users get 'user' role.
*   [x] User login endpoint (`POST /api/auth/login`), returning JWT token.
*   [x] JWT-based authentication middleware (`authMiddleware.js`) for protected routes.
*   [x] Role-Based Access Control (RBAC) with `admin` and `canManageGuild` middleware to secure routes based on user roles and managed guilds.
*   [x] Password hashing using `bcryptjs`.

### User Management Module

*   [x] API to fetch all users (`GET /api/users`) (admin only, password excluded).
*   [x] API to fetch a specific user by ID (`GET /api/users/:user_id`) (admin only, password excluded).
*   [x] API to update user roles and assign/remove `managed_guild_ids` (`PUT /api/users/:user_id`) (admin only, with self-modification safeguards).
*   [x] API to delete users (`DELETE /api/users/:user_id`) (admin only, with self-deletion safeguard).
*   [x] API to retrieve a list of all available guild IDs from existing configurations (`GET /api/users/managed-guilds/available`), for user assignment.
*   [x] Mongoose `User` model with `email`, `password`, `role`, and `managed_guild_ids` fields.

### Guild Configuration Management Module

*   [x] CRUD operations for guild-specific configurations (`/api/config` endpoints).
    *   `GET /api/config`: Get all guild configurations (simplified list for dropdown).
    *   `POST /api/config/:guild_id`: Create a new guild configuration or update an existing one.
    *   `GET /api/config/:guild_id`: Get the full configuration for a specific guild.
    *   `DELETE /api/config/:guild_id`: Delete the configuration for a specific guild.
    *   `GET /api/config/:guild_id/:field`: Get a specific field (e.g., `models`, `shifts`, `display_settings`) from a guild's configuration.
    *   `PUT /api/config/:guild_id/:field`: Update a specific field in a guild's configuration.
*   [x] Support for managing `models`, `shifts`, `periods`, `bonus_rules`, `display_settings`, `commission_settings`, and `msp_settings` per guild.
*   [x] `GuildConfig` Mongoose model with schema validation.

### Earnings Tracking Module

*   [x] CRUD operations for earnings records (`/api/earnings` endpoints).
    *   `GET /api/earnings/:guild_id`: Get all earnings for a specific guild.
    *   `POST /api/earnings/:guild_id`: Create a new earning record for a specific guild.
    *   `GET /api/earnings/entry/:custom_id`: Get a specific earning record by its custom `id`.
    *   `PUT /api/earnings/entry/:custom_id`: Update a specific earning record by its custom `id`.
    *   `DELETE /api/earnings/entry/:custom_id`: Delete a specific earning record by its custom `id`.
*   [x] Authorization checks for earnings operations (admin or manager for that guild).
*   [x] `Earnings` Mongoose model to store detailed earning information (`id`, `guild_id`, `date`, `total_cut`, `gross_revenue`, `period`, `shift`, `role`, `models`, `hours_worked`, `user_mention`).

### Guild Data (Members & Roles) Module

*   [x] API to fetch guild members for a given `guild_id` (`GET /api/guilds/members/:guildId`).
*   [x] API to fetch guild roles for a given `guild_id` (`GET /api/guilds/roles/:guildId`).
*   [x] Mongoose models for `GuildMember` and `GuildRole` to store Discord-related guild data.

### Developer Experience

*   [x] `nodemon` for development auto-restarts.
*   [x] `express-validator` for basic request body validation.
*   [x] Improved error handling and console logging across controllers.
*   [x] Initial `CHANGELOG.md` and detailed `README.md`.

### Changed

*   [x] Updated `README.md` and `CHANGELOG.md` to reflect full 1.0.0 feature set and improved documentation.
*   [x] Refactored `userController` and `authController` to consistently use `managed_guild_ids` array instead of the deprecated `managedGuilds` field.
*   [x] Refined error handling and console logging across controllers for better debugging and user feedback.
*   [x] Adjusted `configController.getAllGuildConfigs` to return a simplified list of `{id, name}` for frontend dropdowns.
*   [x] Ensured consistent handling of guild IDs as strings (Snowflake IDs) across all backend operations.
*   [x] Moved authorization logic into reusable middleware functions (`authMiddleware.js`) where appropriate.

### Removed

*   [x] Deprecated `managedGuilds` field from the `User` model, replaced by `managed_guild_ids`.
