 📌 **Trading Dashboard – Full Stack Assignment**

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
* Clean UI 

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

---

<img width="809" height="745" alt="Screenshot 2025-11-27 at 2 32 16 PM" src="https://github.com/user-attachments/assets/f2bd46f6-e446-4125-a9ba-f92c2b29b643" />

<img width="817" height="547" alt="Screenshot 2025-11-27 at 2 32 53 PM" src="https://github.com/user-attachments/assets/de532d1e-192f-45e4-b05c-37e684996e99" />


<img width="1273" height="609" alt="Screenshot 2025-11-27 at 2 33 32 PM" src="https://github.com/user-attachments/assets/c80da1e1-a1fd-4535-99aa-d69692cd0ff1" />












## 🛠️ Setup & Installation

### 📌 1. Backend Setup

```
cd backend
npm install
```

Create `.env` inside `backend/`:

```
JWT_SECRET=your_secret_key

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


