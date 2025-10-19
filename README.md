# Bulkky Assessment

A full-stack e-commerce application with a backend API (Node.js, Express, TypeScript, Prisma, Redis) and a frontend client (React, TypeScript, React Router, Context API). The project provides admin, authentication, cart, order, wishlist, and client management features, with robust error handling and OpenAPI documentation.

---

## Project Overview

Bulkky is a modern e-commerce platform featuring a RESTful backend and a React frontend.

- **Backend (server/):** Handles authentication, admin/product management, cart, orders, wishlist, and client data.
- **Frontend (client/):** Provides user interfaces for login/register, product browsing, cart, orders, wishlist, and admin dashboard.

---

## Features

### Server (Backend)

- Product CRUD operations
- Admin and User registration/login (JWT)
- Cart management (add/remove/view)
- Order creation and history
- Wishlist management
- Type-safe codebase (TypeScript)
- Prisma ORM (Postgres)
- OpenAPI docs (`/docs`)
- Docker Compose setup for database

### Client (Frontend)

- User authentication (login/register)
- Product listing and details
- Cart and wishlist management
- Order placement and history
- Admin dashboard (protected route)
- React Router navigation
- Context API for data fetching/caching
- Tailwind CSS styling

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, Prisma, Redis
- **Frontend:** React, TypeScript, React Router, TanStack Query, Tailwind CSS
- **Database:** PostgreSQL
- **Testing:** Jest, Supertest, Testing Library
- **Documentation:** Swagger (swagger-ui-express)
- **DevOps:** Docker, Docker Compose

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Docker & Docker Compose

### Backend Setup (`server/`)

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Copy and edit `.env`:
   ```env
   PORT=3000
   DEV_DOCKER_DATABASE=postgresql://postgres:password@db:5432/bulkky
   DEV_DOCKER_SHADOW_DATABASE=postgresql://postgres:password@db:5432/bulkky_shadow
   NODE_ENV=development
   JWT_SECRET=secret
   JWT_EXPIRES_IN=1h
   JWT_ISSUER=bulkky
   ```
3. Start Database:
   ```bash
   docker-compose up --build
   ```
4. Start backend
     
   ```
   npm run build
   npm run start
   ```
   
5. Access API: [http://localhost:3000](http://localhost:3000)  
   Swagger docs: [http://localhost:3000/docs](http://localhost:3000/docs)  
   Adminer: [http://localhost:3001](http://localhost:3001)

### Frontend Setup (`client/`)

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```
3. Access frontend: [http://localhost:3000](http://localhost:3000) (or configured port)

---

## API Endpoints (Backend)

### Admin

- `POST /api/v1/admin/products` — Create products
- `PUT /api/v1/admin/products/:productID` — Update product
- `DELETE /api/v1/admin/products/:productID` — Delete product


### Auth

- `POST /api/v1/auth/sign-up` — Register user
- `POST /api/v1/auth/login` — User login

### Cart

- `GET /api/v1/cart` — Get cart
- `POST /api/v1/cart/products` — Add product
- `DELETE /api/v1/cart/products/:productID` — Delete Cart
- `PUT /api/v1/cart/products/:productID` — Update Cart

### Orders

- `POST /api/v1/orders` — Place order from cart
- `GET /api/v1/orders` — Get orders

### Wishlist

- `GET /api/v1/wishlist` — Get wishlist
- `POST /api/v1/wishlist/add` — Create wishlist
- `DELETE /api/v1/wishlist/:productID` — Remove product

### Client

- `GET /api/v1/client/products` — Get all products
- `GET /api/v1/client/products/:productID` — Get a product

---

## Frontend Routes

- `/login` — Login page
- `/register` — Registration page
- `/products` — Product listing
- `/products/:id` — Product details
- `/orders` — Orders
- `/wishlist` — Wishlist
- `/admin` — Admin dashboard (protected)
- `/` — Redirect to `/products`

---

## Project Structure

```
├── server/
│   ├── src/
│   │   ├── api/
│   │   ├── exceptions/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── server.ts
│   ├── prisma/
│   ├── docker-compose.yaml
│   ├── .env
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   ├── public/
│   ├── tailwind.config.js
│   ├── package.json
```

---

## License

MIT License - see LICENSE file for details.
│ ├── middlewares/
│ ├── utils/
│ ├── app.ts
│ ├── server.ts
├── prisma/
│ ├── schema.prisma
│ └── migrations/
├── docker-compose.yaml
├── Dockerfile
├── .env

```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


## License

This project is licensed under the MIT License - see the LICENSE file for details.
```
