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
DB_PASSWORD=your_password
DB_NAME=irctc
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_admin_api_key

```
