# 📚 Bookify

## 📝 Overview
**Bookify** is an user-friendly online book store built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless experience for both readers and administrators. The system is designed to facilitate browsing, searching, and buting books. Below is a detailed overview of the platform's key features:

## 🚀 Key Features

| Feature                     | Description                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------|
| **🔐 User Authentication**   | Secure login and registration system using [Firebase](https://firebase.google.com/) for user authentication.      |
| **📚 Book Catalog**          | Users can browse and search for books by title, author, or genre.                              |
| **🛒 Cart and Borrowing**    | Users can add books to their cart, borrow books, and track borrowing history.                  |
| **📊 Admin Dashboard**       | Admins can add, update, delete, and manage book listings.                                       |
| **📂 Data Storage**          | Store user data and book information in [MongoDB](https://www.mongodb.com/). |
| **💬 User Reviews**          | Allow users to leave reviews and ratings for books they have borrowed.                         |

## 🛠️ Technologies & Tools

| Technology            | Purpose                                      | Link                                               |
|-----------------------|----------------------------------------------|----------------------------------------------------|
| **MongoDB**           | NoSQL database for storing books and user data | [MongoDB](https://www.mongodb.com/)                |
| **Express.js**        | Backend framework for API development        | [Express.js](https://expressjs.com/)               |
| **React**             | Frontend framework for building the user interface | [React](https://reactjs.org/)                     |
| **Node.js**           | JavaScript runtime for backend development    | [Node.js](https://nodejs.org/)                     |
| **Firebase**               | Secure user authentication                   | [Firebase](https://firebase.google.com/)                            |
| **GitHub**            | Version control for team collaboration       | [GitHub](https://github.com/)                     |



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