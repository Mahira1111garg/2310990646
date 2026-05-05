# Notification System

A full-stack notification management system that fetches, prioritizes, and dynamically displays notifications based on customizable importance rules and recency. This project features a robust Express backend and a responsive React frontend fully styled with Material UI.

## Features
- **Structured Logging:** Centralized logging middleware built into controllers and services for standardized tracking (logs metrics like stack, package, level, message).
- **Intelligent Prioritization Algorithm:** Sorts messages based on event type weights (`Placement > Result > Event`) and uses recency as a tie-breaker.
- **Paginated All Notifications View:** See all incoming events and filter them conveniently by Type.
- **Top N Dashboard:** High-priority board fetching the exact top `N` urgent notifications in real time.
- **Responsive Design:** A polished, fully responsive UI built entirely with Material UI components.

## Tech Stack
- **Backend:** Node.js, Express, Axios, CORS
- **Frontend:** React (Create React App), Material UI, Axios, React Router v6

## Setup Instructions

### Pre-requisites
- Node.js (v18+)
- Ensure port 5001 is free (the backend defaults to 5001 to avoid Apple's AirPort Receiver conflicts on macOS port 5000)
- Ensure port 3000 is free for the React frontend

### 1. Running the Backend
1. Open a terminal and navigate to the project root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   # or node notification_app_be/server.js
   ```
4. The server runs on `http://localhost:5001`. It auto-generates a token on startup and fetches notifications to serve over the API.

### 2. Running the Frontend
1. Open a new terminal tab and navigate into the `notification_app_fe` directory:
   ```bash
   cd notification_app_fe
   ```
2. Install frontend dependencies (already setup if followed exact steps but ensures packages):
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
4. The web app should automatically open at `http://localhost:3000`. Navigate between "All Notifications" (paged + filtered) and "Priority Notifications" natively.

## Project Structure
- `notification_app_be/`: API server setup, controllers, routes, utilities and core services driving the backend.
- `logging_middleware/`: Standardized logging scripts handling token refresh and structured external evaluation logs.
- `notification_app_fe/`: React frontend providing the beautiful UI using Material UI.
- `screenshots/`: Collection of snapshots indicating feature completeness and functionality.
- `notification_system_design.md`: Core system architecture design emphasizing edge cases and sorting efficiency explanations.
