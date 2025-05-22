# IRCTC_API 🚆

A simple railway booking system API inspired by IRCTC, built using **Node.js**, **Express**, and **MySQL**. It includes user registration/login, admin-protected train management, real-time seat availability, and booking with race condition handling.

---

## 🔧 Project Setup

### Prerequisites

- Node.js
- MySQL
- Postman (for API testing)

### Installation

```bash
npm install express dotenv mysql2 bcryptjs jsonwebtoken
```




Environment Variables
Create a .env file in the root directory and configure:

.env
```bash
PORT=2127
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=irctc
JWT_SECRET=your_jwt_secret
API_KEY=your_admin_api_key

```


#Installation

Clone the repository to your local machine:
```bash
git clone https://github.com/Ash1327/IRCTC_API.git
```
Install all necessary dependencies using npm:
```bash
 npm install
```
Set up your MySQL database:

Create a MySQL database named irctc.
Run the SQL scripts in database/schema.sql to create necessary tables (users, trains, bookings).

```bash
CREATE DATABASE irctc_db;
USE irctc_db;

CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   role ENUM('user', 'admin') DEFAULT 'user',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trains (
   id INT AUTO_INCREMENT PRIMARY KEY,
   train_number VARCHAR(50) NOT NULL,
   source VARCHAR(255) NOT NULL,
   destination VARCHAR(255) NOT NULL,
   total_seats INT NOT NULL,
   available_seats INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   train_id INT,
   seats INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (train_id) REFERENCES trains(id)
);
```

# Start the server
```bash
nodemon server.js
```

now use the API : http://localhost:2127.





## 📘 API Reference

### User Routes

#### 📌 Register a User
**POST** `/user/register`

**Body:**
```json
{
  "name": "abc",
  "email": "abc@gmail.com",
  "password": "p1234"
}
```


### 📌 Login User

**Endpoint:** `POST /user/login`  
Logs in a registered user and returns a JWT token.


**Request Body:**
```json
{
  "email": "abc@gmail.com",
  "password": "p1234"
}
```
copy the Token
