# 📚 Bookify

## 📝 Overview
**Bookify** is an user-friendly online book store built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless experience for both readers and administrators. The system is designed to facilitate browsing, searching, and buting books. Below is a detailed overview of the platform's key features:

## 🚀 Key Features

| Feature                     | Description                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------|
| **🔐 User Authentication**   | Secure login and registration system using [Firebase](https://firebase.google.com/) for user authentication.      |
| **📚 Book Catalog**          | Users can browse and search for books by title, author, or genre.                              |
| **🛒 Cart and ordering**    | Users can add books to their cart, order books, and track order history.                  |
| **📊 Admin Dashboard**       | Admins can add, update, delete, and manage book listings.                                       |
| **📂 Data Storage**          | Store user data and book information in [MongoDB](https://www.mongodb.com/). 
                     

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

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technologies & Tools](#-technologies--tools)
- [Features](#features)
  - [Homepage](#homepage)
  - [All Books Page](#all-books-page)
  - [User Signup](#user-signup)
  - [User Login](#user-login)
  - [Admin Dashboard](#admin-dashboard)
  - [Add to cart](#add-to-cart)
  - [Checkout Page](#checkout-page)
  - [Order Page](#order-page)
  - [Books Description Page](#books-description-page)
  - [Related Books Section](#related-books-section)
  - [Review Section](#review-section)


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
## Features
### Homepage
The homepage provides an overview of the platform, showcasing featured books, top sellers, and new arrivals. It serves as the main entry point for users to explore the book collection.

![alt text](./frontend//src/assets/Readme/HomePage1.JPG)
Top Sellers Section Shows the top selling books at a certain period
![alt text](./frontend//src/assets/Readme/HomePage2.JPG)
Recommended for you shows curated books just for you
![alt text](./frontend//src/assets/Readme/HomePage3.JPG)

### All Books Page
This page displays a comprehensive list of all available books. Users can browse through the collection, filter by categories, and search for specific titles or authors.

![alt text](./frontend//src/assets/Readme/AllBooksPage.JPG)

### User Signup
New users can create an account by providing their details. This allows them to access personalized features such as adding books to their wishlist and placing orders.

![alt text](./frontend//src/assets/Readme/Register.JPG)

### User Login
Existing users can log in to their accounts to access their saved preferences, order history, and other personalized features.

![alt text](./frontend//src/assets/Readme/Login.JPG)

### Admin Dashboard
Admins have access to a dedicated dashboard where they can manage the book listings, including adding new books, updating existing ones, and removing books from the catalog.

![alt text](./frontend//src/assets/Readme/dashboardadmin.JPG)

### Add to cart
Users can add books to their cart for purchase. The cart keeps track of selected items and allows users to proceed to checkout when they are ready to complete their purchase.

![alt text](./frontend//src/assets/Readme/AddtoCart.JPG)

### Checkout Page
The checkout page provides a summary of the items in the user's cart and allows them to enter their shipping and payment information to complete the purchase.

![alt text](./frontend//src/assets/Readme/CheckoutPage.JPG)

### Order Page
The order page allows users to view their order history, track the status of their current orders, and manage their past purchases.

![alt text](./frontend//src/assets/Readme/OrderPage.JPG)

### Books Description Page
This page provides detailed information about a specific book, including its description, author, price, and reviews from other users.

![alt text](./frontend//src/assets/Readme/SingleBook.JPG)

### Related Books Section
The related books section suggests books similar to the one currently being viewed, helping users discover more books of interest.

![alt text](./frontend//src/assets/Readme/RelatedBooks.JPG)

### Review Section
Users can read reviews left by other readers and leave their own reviews for books they have read. This section helps users make informed decisions about their book purchases.

![alt text](./frontend//src/assets/Readme/Review%20System.JPG)
````
