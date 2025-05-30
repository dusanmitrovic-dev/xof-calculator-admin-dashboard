# Guild API

A Node.js backend API server using Express and MongoDB (Mongoose) to manage configurations and earnings for different guilds.

## Features

*   **Guild Configuration:**
    *   Create, Read, Update, Delete (CRUD) operations for guild-specific configurations.
    *   Manage models, shifts, periods, bonus rules, display settings, commission settings, and roles per guild.
    *   Endpoints to get/update specific configuration fields.
*   **Earnings Tracking:**
    *   CRUD operations for earnings records associated with a guild.
    *   Store details like date, revenue, period, shift, role, models worked, hours, and user.

## Project Structure

```
.
├── .env                # Environment variables (MongoDB URI, Port)
├── config/
│   └── db.js           # MongoDB connection logic
├── controllers/        # Request handling logic
│   ├── configController.js
│   └── earningController.js
├── models/             # Mongoose schemas and models
│   ├── Earning.js
│   └── GuildConfig.js
├── routes/             # API route definitions
│   ├── configRoutes.js
│   └── earningRoutes.js
├── server.js           # Main application entry point
├── package.json        # Project dependencies and scripts
├── CHANGELOG.md        # Record of changes
└── README.md           # This file
```

## Prerequisites

*   Node.js (v14 or higher recommended)
*   npm or yarn
*   MongoDB instance (local or cloud-based like MongoDB Atlas)
*   `curl` or an API testing tool like Postman

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd guild-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    *   Create a `.env` file in the root directory.
    *   Add the following variables:
        ```env
        MONGO_URI=<your_mongodb_connection_string>
        PORT=5000
        ```
    *   Replace `<your_mongodb_connection_string>` with your actual MongoDB connection URI (e.g., `mongodb://localhost:27017/guild_db` for a local database named `guild_db`).

## Running the Server

*   **Development mode (with automatic restarts):**
    ```bash
    npm run dev
    ```
*   **Production mode:**
    ```bash
    npm start
    ```

The server will start on the port specified in your `.env` file (default is 5000). Default URL: `http://localhost:5000`

## API Endpoints

**Base URL:** `/api`

### Configuration (`/api/config`)

*   `GET /`: Get all guild configurations.
*   `POST /`: Create a new guild configuration or update an existing one (based on `guild_id` in the request body).
*   `GET /:guild_id`: Get the configuration for a specific guild.
*   `DELETE /:guild_id`: Delete the configuration for a specific guild.
*   `GET /:guild_id/:field`: Get a specific field (e.g., `models`, `shifts`, `display_settings`) from a guild's configuration.
*   `PUT /:guild_id/:field`: Update a specific field in a guild's configuration. The request body should be `{"value": <new_value>}`.

### Earnings (`/api/earnings`)

*   `GET /:guild_id`: Get all earnings records for a specific guild.
*   `POST /:guild_id`: Create a new earning record for a specific guild.
*   `GET /entry/:earning_id`: Get a specific earning record by its MongoDB `_id`.
*   `PUT /entry/:earning_id`: Update a specific earning record by its `_id`.
*   `DELETE /entry/:earning_id`: Delete a specific earning record by its `_id`.

## Testing with `curl`

Replace `YOUR_GUILD_ID` with a valid ID (e.g., `1190431681266589807`). Replace `YOUR_EARNING_ID` with an actual `_id` from a created earning.
Replace `localhost:5000` if your server runs on a different port or host.

### Config Endpoints

1.  **Create/Update Guild Config:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "guild_id": "YOUR_GUILD_ID",
      "models": ["modelA", "modelB"],
      "shifts": ["day", "night"],
      "periods": ["weekly", "monthly"],
      "bonus_rules": [{"from": 0, "to": 1000, "amount": 5}],
      "display_settings": {"agency_name": "My Test Agency"},
      "commission_settings": { "roles": { "ROLE_ID_1": { "commission_percentage": 7.5 } } },
      "roles": {"ROLE_ID_1": 7.5}
    }' http://localhost:5000/api/config
    ```

2.  **Get All Guild Configs:**
    ```bash
    curl http://localhost:5000/api/config
    ```

3.  **Get Specific Guild Config:**
    ```bash
    curl http://localhost:5000/api/config/YOUR_GUILD_ID
    ```

4.  **Get Specific Field (models):**
    ```bash
    curl http://localhost:5000/api/config/YOUR_GUILD_ID/models
    ```

5.  **Update Specific Field (models):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"value": ["modelA", "modelB", "modelC"]}' http://localhost:5000/api/config/YOUR_GUILD_ID/models
    ```

6.  **Update Specific Field (display_settings):**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"value": {"agency_name": "Updated Agency Name", "show_average": false}}' http://localhost:5000/api/config/YOUR_GUILD_ID/display_settings
    ```

7.  **Delete Guild Config:**
    ```bash
    curl -X DELETE http://localhost:5000/api/config/YOUR_GUILD_ID
    ```

### Earnings Endpoints

1.  **Create Earning:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "id": "unique-earning-id-123",
      "date": "15/07/2024",
      "total_cut": 55.5,
      "gross_revenue": 1500,
      "period": "weekly",
      "shift": "day",
      "role": "Some Role",
      "models": "modelA",
      "hours_worked": 8,
      "user_mention": "<@USER_ID>"
    }' http://localhost:5000/api/earnings/YOUR_GUILD_ID
    ```
    *Note: Save the `_id` from the response for later tests.* 

2.  **Get All Earnings for Guild:**
    ```bash
    curl http://localhost:5000/api/earnings/YOUR_GUILD_ID
    ```

3.  **Get Specific Earning:**
    *(Replace `YOUR_EARNING_ID` with the actual `_id` from the creation step)*
    ```bash
    curl http://localhost:5000/api/earnings/entry/YOUR_EARNING_ID
    ```

4.  **Update Specific Earning:**
    *(Replace `YOUR_EARNING_ID`)*
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"total_cut": 60.0, "hours_worked": 8.5}' http://localhost:5000/api/earnings/entry/YOUR_EARNING_ID
    ```

5.  **Delete Specific Earning:**
    *(Replace `YOUR_EARNING_ID`)*
    ```bash
    curl -X DELETE http://localhost:5000/api/earnings/entry/YOUR_EARNING_ID
    ```

## TODO / Potential Improvements

*   **Authentication & Authorization:** Secure endpoints to ensure only authorized users/bots can modify data.
*   **Input Validation:** Add more robust input validation (e.g., using `express-validator`).
*   **Error Handling:** Implement more specific error handling and logging.
*   **Testing Framework:** Implement a proper testing framework (e.g., Jest, Mocha, Chai) for automated unit and integration tests.
*   **Data Seeding:** Create scripts to populate initial data.
*   **API Documentation:** Use tools like Swagger/OpenAPI for better documentation.
*   **Relationship Management:** Consider using Mongoose population if relationships between models become more complex (e.g., linking earnings directly to User documents).
