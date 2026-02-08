# Order Management

This repository contains two projects:
- **frontend/**: React 19 + Vite application
- **backend/**: Ruby on Rails 7.2 API-only application (Ruby 3.2)

All services run in Docker using `docker-compose`.

## Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Quick Start

1. **Build and start all services:**

```bash
make build
```

2. **Access the apps:**
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend (Rails API): [http://localhost:3000](http://localhost:3000)

3. **Database**
- Postgres runs in the `db` service.
- Default credentials (see `docker-compose.yml`):
  - Host: `db`
  - Username: `postgres`
  - Password: `postgres`
  - Database: `aceup_db`

4. **First-time Rails setup** (run in another terminal):

```bash
make db.init
```

## Useful Commands

- **Rebuild images after dependency changes:**
  ```bash
  make build
  ```

- **Start the services:**
  ```bash
  make start
  ```

- **Stop all services:**
  ```bash
  make stop
  ```

- **Go into rails console:**
  ```bash
  make rails.c
  ```

- **Go into bash console:**
  ```bash
  make sh
  ```

- **Run migrations:**
  ```bash
  make db.migrate
  ```

- **Run seeds:**
  ```bash
  docker-compose exec backend rails db:seed
  ```

## FullStack
  Following the MVCS pattern (Model, View, Controller, Service), create a very simple order management system.

  **Frontend**

  - Create a Dashboard with at least 1 stat (# of orders created)
  - Create an order table | New Order button | New Order dialog
  - Refresh orders after new is created

  **Backend**

  - Orders crud
  - Send an email after an order is created

## Improvements
  This is a basic order management system. There are many improvements that can be made:
  
  **Frontend**
  - Add tests with vitest, react-testing-library
  - Add more validations
  - Add type safety with TypeScript (use .ts instead .jsx and .js)
  - Organize hooks per domain (order, user, auth)
  - Add interceptors to handle errors and show toasts
  - Add a loading indicator when requests are pending
  
  **Backend**
  - Add authentication and authorization
  - Separate customer, product and order models
  - Add validations
  - Add tests with rspec
  - Prevent time attacks
  - Add service mailer to docker-compose.yml so we can read emails instead of console use Mailtrap
  - Add a cron job to send an email every day with the number of orders created in the last day