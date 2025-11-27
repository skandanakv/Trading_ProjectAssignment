const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const brokerRoutes = require('./routes/broker');

// Use routes
app.use('/api', authRoutes);
app.use('/api', brokerRoutes);

app.get('/', (req, res) => {
    res.send("Backend is running...");
  });
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
