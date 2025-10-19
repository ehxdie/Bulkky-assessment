Bulkky Assessment
A full-stack e-commerce platform for product, cart, wishlist, and order management. Built with Node.js, Express, TypeScript, Prisma (Postgres), Redis, and React. The application provides RESTful APIs for backend operations and a modern, responsive frontend for users and admins.

Project Overview
Bulkky Assessment is a modern e-commerce solution supporting user authentication, product browsing, cart and wishlist management, and order placement. It features robust error handling, type-safe code, and a clean, scalable architecture.

Features
User Features
Register and login (JWT authentication)
Browse products and view product details
Add products to cart and wishlist
Update cart quantities, place orders from cart
View order history and wishlist
Admin Features
Create, update, and delete products
Admin dashboard for product management
Technical Features
Type-safe codebase (TypeScript)
Prisma ORM for PostgreSQL
Redis for caching and session management
Comprehensive error handling
Docker Compose for local development
Responsive React frontend (with protected routes)
Modern UI with Montserrat font and mobile-first design
Tech Stack
Backend: Node.js, Express, TypeScript
Database: PostgreSQL (via Prisma ORM)
Cache/Session: Redis
Frontend: React, React Router, Tailwind CSS
DevOps: Docker, Docker Compose
Getting Started
Prerequisites
Node.js (v16 or higher)
npm or yarn
Docker & Docker Compose
Installation
Clone the repository

Copy and edit the .env file in server

Start the stack (API, Postgres, Redis, Adminer)

Access the API at http://localhost:3000
Adminer at http://localhost:3001

Start the frontend

Access the frontend at http://localhost:3000 (or the port specified in your React config).

Environment Configuration
Example .env for Backend
Running Tests
API Documentation
The API provides the following endpoints:

Authentication
POST /api/v1/auth/login — Login
POST /api/v1/auth/sign-up — Register
Product Endpoints
GET /api/v1/client/products — List all products
GET /api/v1/client/products/:id — Get product details
Cart Endpoints
GET /api/v1/cart — Get cart items
POST /api/v1/cart/products — Add product to cart
PUT /api/v1/cart/products/:id — Update cart item quantity
DELETE /api/v1/cart/products/:id — Remove item from cart
Wishlist Endpoints
GET /api/v1/wishlist — Get wishlist items
POST /api/v1/wishlist — Add product to wishlist
DELETE /api/v1/wishlist — Remove product from wishlist
Order Endpoints
POST /api/v1/orders — Place order from cart
GET /api/v1/orders — Get user orders
Admin Endpoints
POST /api/v1/admin/products — Create product
PUT /api/v1/admin/products/:id — Update product
DELETE /api/v1/admin/products/:id — Delete product
Development
Project Structure
Contributing
Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
Testing
Unit Tests (Jest)
Integration Tests (Jest + Supertest)
API Tests
License
This project is licensed under the MIT License - see the LICENSE file for details.
