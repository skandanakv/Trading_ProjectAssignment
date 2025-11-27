const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db.db');

// REGISTER
// REGISTER
router.post('/register', async (req, res) => {
  const { userId, password, email, mobile, broker_userId, broker_password, otp } = req.body;

  // Mock OTP check
  if (otp !== "1234") return res.status(400).json({ error: "Invalid OTP" });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (userId, password, email, mobile, broker_userId, broker_password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [userId, hashedPassword, email, mobile, broker_userId, broker_password],
    function (err) {
      if (err) {
        console.log("DB ERROR:", err);

        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({ error: "User ID already exists" });
        }

        return res.status(500).json({ error: "Registration failed" });
      }

      res.json({ success: true });
    }
  );
});


// LOGIN
router.post('/login', (req, res) => {
  const { userId, password } = req.body;

  const query = `SELECT * FROM users WHERE userId = ?`;

  db.get(query, [userId], async function (err, user) {
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ 
      token ,
      broker_userId: user.broker_userId,
      broker_password: user.broker_password
    });
  });
});

module.exports = router;




// Handles registration
//  Validates mocked OTP
//  Hashes password
//  Stores data in database
//  Login compares hashed password
//  Generates JWT
//  Returns token