# Bookify

Bookify is a full-stack web application for managing books, reviews, and wishlists. It consists of a backend built with Node.js, Express, and MongoDB, and a frontend built with React and Vite.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Book management (CRUD operations)
- Review system for books
- Wishlist management
- Responsive UI

## Project Structure

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/bookify.git
cd bookify
cd backend
npm install
cd ../frontend
npm install
```

## Environment Variables

Create a .env file in the backend directory and add the following environment variables:

```sh
DB_URL="your_mongodb_connection_string"
PORT=5000
JWT_SECRET_KEY="your_jwt_secret_key"
```

Running the Application
Start the backend server:
```sh
cd backend
npm run dev
```
Start the frontend development server:
```sh
cd frontend
npm run dev
```