# Movie Booking API

This is a robust, production-ready backend for a movie ticket booking system, built with Node.js, Express, PostgreSQL, and Redis. It features full JWT authentication and solves complex backend challenges like concurrency and idempotency.

**Live API:** `https-://your-app-name.onrender.com`

## Core Features

* **Authentication:** Full user sign-up and login system using **JWT (JSON Web Tokens)** and `bcryptjs` for password hashing.
* **Concurrency:** Safely handles simultaneous booking requests for the same seat using database transactions (Atomic Updates) to prevent double-bookings.
* **Idempotency:** Prevents duplicate charges or bookings from network retries using an `Idempotency-Key` and a Redis cache.
* **Testability:** Includes an integration test suite using Jest and Supertest against a separate test database.

## Technical Documentation

For a detailed breakdown of the system architecture, database schema, and tech stack, see the full [**DOCUMENTATION.md**](DOCUMENTATION.md).

## Tech Stack

| Library | Category | Purpose |
| :--- | :--- | :--- |
| **Node.js** | Runtime | Asynchronous, non-blocking I/O runtime. |
| **Express.js** | Framework | Minimalist web framework for routing and middleware. |
| **PostgreSQL** | Database | Primary relational database for transactional (ACID) integrity. |
| **Redis** | In-Memory Cache | Used for storing idempotency keys for fast lookups. |
| **Knex.js** | ORM/Query Builder | Used for SQL query building and schema migrations. |
| **`jsonwebtoken`** | Authentication | To sign and verify stateless JWTs for auth. |
| **`bcryptjs`** | Security | To hash and compare user passwords securely. |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user. |
| `POST` | `/api/auth/login` | Log in a user and receive a JWT. |

### Core App
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/movies` | Get all available movies. |
| `GET` | `/api/movies/:movieId/shows` | Get all shows for a specific movie. |
| `GET` | `/api/shows/:showId/seats` | Get all seats (and their booking status) for a specific show. |
| `POST` | `/api/bookings` | **(Protected)** Book a new seat. Requires `Bearer Token` and `Idempotency-Key` headers. |

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
    Create a `.env` file in the root and add your credentials:
    ```
    PORT=3000
    
    # Database
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=movie_booking_db
    DB_USER=postgres
    DB_PASSWORD=your_password
    
    # Redis
    REDIS_URL=redis://localhost:6379
    
    # Auth
    JWT_SECRET=your_very_long_and_random_jwt_secret
    ```
4.  **Run database migrations and seeds:**
    ```bash
    npx knex migrate:latest
    npx knex seed:run
    ```
5.  **Start the dev server:** `npm run dev`

## Future Scope & Improvements

* **Payment Gateway:** Integrate Stripe to handle payments on booking, using a 2-phase commit (reserve seat, confirm on payment).
* **Email/SMS Confirmation:** Use a service like SendGrid to send booking confirmations to users.
* **Admin Panel:** A separate interface for admins to add new movies, theaters, and showtimes.
* **User Profiles:** Allow users to see their booking history.