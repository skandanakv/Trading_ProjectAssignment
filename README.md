
---

# 📌 **Trading Dashboard – Full Stack Assignment**

A full-stack trading dashboard built using **React**, **Node.js**, **Express**, and **SQLite**.
Users can register, log in with JWT authentication, connect to a mock broker using credentials, and fetch portfolio data (balance + holdings + PnL calculations).

---

## 🚀 Features

### 🔐 **User Authentication**

* Register new users
* Mock OTP verification (1234)
* Password hashing using **bcrypt**
* Login using **JWT tokens**
* Protected API routes

### 🔗 **Broker Connection**

* "Connect Broker" button in dashboard
* Sends:

  * `broker_userId`
  * `broker_password`
* Backend validates & returns:

  * Wallet Balance
  * Holdings
  * Dynamic PnL calculations (currentPrice - avgPrice)

### 📊 **Dashboard**

* Displays:

  * Available balance
  * Holdings table
  * Current price per asset
  * PnL (+/-) and PnL %
* Clean UI with custom CSS styles

### 🗄️ **Backend**

* Node.js + Express
* SQLite database
* Routes:

  * `/api/register`
  * `/api/login`
  * `/api/connect-broker` (protected)
* JWT authentication middleware
* Dynamic broker balance calculation

### 🎨 **Frontend**

* React (CRA)
* User-friendly pages:

  * Login
  * Register
  * Dashboard
* Axios-based API client
* CSS modular styling


---

## 🛠️ Setup & Installation

### 📌 1. Backend Setup

```
cd backend
npm install
```

Create `.env` inside `backend/`:

```
JWT_SECRET=your_secret_key
PORT=4000
```

Start the backend server:

```
node index.js
```

Backend runs on:

```
http://localhost:4000
```

---

### 📌 2. Frontend Setup

```
cd frontend/client
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔑 API Endpoints

### **POST /api/register**

Registers a new user
Request body:

```json
{
  "userId": "test123",
  "password": "pass123",
  "email": "email@test.com",
  "mobile": "9999999999",
  "broker_userId": "broker123",
  "broker_password": "pass123",
  "otp": "1234"
}
```

---

### **POST /api/login**

Returns JWT token
Request:

```json
{
  "userId": "test123",
  "password": "pass123"
}
```

Response:

```json
{
  "token": "<jwt_token>"
}
```

---

### **POST /api/connect-broker**

Protected route — requires JWT
Request headers:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "broker_userId": "broker123",
  "broker_password": "pass123"
}
```

Response:

```json
{
  "balance": 150000,
  "holdings": [
    { "name": "BTC", "qty": 1.2, "avgPrice": 53000 },
    { "name": "ETH", "qty": 3.5, "avgPrice": 1800 },
    { "name": "SOL", "qty": 5, "avgPrice": 150 }
  ]
}
```

---

## 👤 Author

**Skandana KV**

---


