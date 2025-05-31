# Changelog

## 1.0.0

### Features

*   **User Management:**
    *   User authentication system including login and logout functionality.
    *   Role-based access control (RBAC) with specific guards for admin and authenticated users.
    *   Automated JWT token injection into API requests for secure communication.
    *   User registration process.
    *   Comprehensive user listing with ability to view and manage user details.
    *   User editing functionality through a dedicated modal interface.

*   **Guild Management:**
    *   Centralized management for guild configurations, allowing for listing, viewing, and modification.
    *   Ability to fetch and display guild members and roles, resolving Discord IDs to readable names.
    *   Ability to edit various guild configuration settings via a dedicated modal, including full configuration or specific sections like commission roles.
    *   Ability to delete entire guild configurations.
    *   Functionality to copy guild IDs to clipboard for easy reference.
    *   Specialized configuration management for MSP (Member Service Provider) settings within guilds.

*   **Earnings Management:**
    *   Fetching and displaying all earning records for a specific guild.
    *   Aggregated view of earnings across all guilds (for authorized roles like admin/manager).
    *   Filtering of earnings by text search, hours worked, gross revenue, and total cut.
    *   Sorting of earnings records by various columns (e.g., date, user, role, financial figures).
    *   Pagination of earnings records for better readability and performance.
    *   Creation of new earning records via a modal interface.
    *   Viewing and updating existing earning records through a dedicated modal.
    *   Deletion of earning records with confirmation.

*   **Dashboard Overview:**
    *   Interactive dashboard providing a summarized view of key application data.
    *   Integration of custom data to populate dashboard charts.

### Enhancements

*   **Application Structure:**
    *   Established robust routing infrastructure for navigation.
    *   Implemented a modular application design for better organization and scalability.
    *   Default application layout defined, including a consistent header, footer, and navigation system.
    *   Improved error handling and loading indicators across data-intensive views.