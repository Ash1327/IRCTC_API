# IRCTC_API 🚆

✅ Hour 1: Planning & Setup
##Carefully read and understood the problem statement.
##Decided to use:
##Node.js + Express (fast setup, async-friendly)

MySQL (required)
##Sketched the ER diagram (Users, Trains, Bookings).
##Outlined key APIs and access control rules.
##Initialized project structure (routes/, controllers/, models/).

🔐 Hour 2: Authentication & Role Setup
##Created register and login endpoints.
##Implemented password hashing with bcrypt.
##Added JWT token-based authentication.
##Built middleware for API key verification for admin routes.

🚆 Hour 3: Train Management (Admin)
Created:
##POST /trains – add a new train
##PUT /trains/:id – update seat details
##Protected these with the admin API key middleware.

📦 Hour 4–5: Booking System with Race Condition Handling
Created:
##GET /trains?source=A&dest=B – search trains and availability
##POST /bookings – book seats (JWT protected)
##Used MySQL transactions + row-level locking to ensure safe concurrent booking.

📋 Hour 6: Get Booking Details
##Created GET /bookings/:id (JWT protected)
##Ensured it returns only the logged-in user’s booking
##Handled error cases (invalid train ID, no seats, etc.).

🧪 Hour 7: Testing & Final Polish
##Manual testing of all endpoints using Postman
##Verified auth flow, booking concurrency, and admin access.



A simple railway booking system API inspired by IRCTC, built using **Node.js**, **Express**, and **MySQL**. It includes user registration/login, admin-protected train management, real-time seat availability, and booking with race condition handling.

---

✅ Functional Requirements
User registration

User login with JWT

Role-based access control (user, admin)

Add train (admin only)

Search trains by source and destination

View seat availability

Book seat (with race condition handling)

Get specific booking details

⚙️ Non-Functional Requirements
Password encryption (bcrypt)

JWT authentication

API key protection for admin routes

Transactional booking with row-level locking

Fast API response times

Modular code structure

Scalable design

Well-documented README

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


### 📌 Add a New Train

**Endpoint:** `POST /admin/addTrain`  
Allows an admin to add a new train to the system.

---

**Request Headers:**
x-api-key: your_admin_api_key



**Request Body:**
```json
{
  "trainNumber": "1001",
  "source": "Panipat",
  "destination": "Delhi",
  "totalSeats": 200,
  "availableSeats": 200
}
```
Success Response:
```json
{
  "message": "Trains added successfully",
  "trainIds": [
    {
      "trainNumber": "1001",
      "trainId": 1
    }
  ]
}
```




#### 📌 Check Train Availability

**Endpoint:** `GET /user/availability`  
Checks for available trains between a source and destination.

---

**Query Parameters:**
source=Panipat
destination=Delhi


**Example Request:**
GET http://localhost:2127/user/availability?source=Panipat&destination=Delhi

---

**Success Response:**
```json
{
  "available": true,
  "availableTrainCount": 1,
  "trains": [
    {
      "trainNumber": "1001",
      "availableSeats": 200
    }
  ]
}
```

#### 📌 Book Train Tickets

**Endpoint:** `POST /user/booking`  
Books a specified number of seats on a train for the logged-in user.

---

**Request Headers:**
key:Authorization
value : *(Use the token received from the login endpoint)*

---

**Request Body:**
```json
{
  "trainId": 1,
  "seatsToBook": 10
}
```
Success Response:

```json
{
  "message": "Seats booked successfully"
}
```


#### 📌 Get User Booking Details

**Endpoint:** `GET /user/bookingDetails`  
Retrieves all booking records for the logged-in user.

---

**Success Response:**
```json
[
  {
    "booking_id": 1,
    "number_of_seats": 10,
    "train_number": "1001",
    "source": "Panipat",
    "destination": "Delhi"
  }
]
```


### 🔐 Update Train Seat Info

**Endpoint:** `PUT /admin/update-seats/:trainId`  
Updates the total and available seats for a specific train.

---

**Request Headers:**
x-api-key: your_admin_api_key


---

**Request Parameters:**

| Parameter | Type   | Description         |
|-----------|--------|---------------------|
| trainId   | Number | ID of the train to update |

---

**Request Body:**
```json
{
  "totalSeats": 200,
  "availableSeats": 150
}
```

Success Response:

```json
{
  "message": "Seats updated successfully"
}
```
