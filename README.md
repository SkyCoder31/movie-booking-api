# Movie Booking API

This is a robust, production-ready backend for a movie ticket booking system, built with Node.js, Express, PostgreSQL, and Redis.

This project is not just a simple CRUD API; it is designed to solve complex backend engineering challenges, including:
* **Concurrency:** Safely handling simultaneous booking requests for the same seat using database transactions (Atomic Updates) to prevent double-bookings.
* **Idempotency:** Preventing duplicate charges or bookings from network retries using an idempotency-key and Redis.
* **Testability:** Fully tested with an integration test suite using Jest and Supertest against a separate test database.

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Query Builder:** Knex.js (for schema migrations and seeds)
* **Cache:** Redis (for idempotency)
* **Testing:** Jest, Supertest
* **Deployment:** Render

## Key API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/movies` | Get all available movies. |
| `GET` | `/api/shows` | Get all shows with movie/theater info. |
| `GET` | `/api/shows/:id/seats` | Get all seats (and their status) for a specific show. |
| `POST` | `/api/bookings` | Book a new seat. (Requires `Idempotency-Key` header) |

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd movie-booking-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root and add your database/Redis credentials:
    ```
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=movie_booking_db
    DB_USER=postgres
    DB_PASSWORD=your_password
    REDIS_URL=redis://localhost:6379
    ```

4.  **Run database migrations and seeds:**
    ```bash
    npx knex migrate:latest
    npx knex seed:run
    ```

5.  **Run the tests:**
    (Requires a test database named `movie_booking_db_test`)
    ```bash
    npm test
    ```

6.  **Start the development server:**
    ```bash
    npm run dev
    ```