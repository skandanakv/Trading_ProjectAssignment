const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const currentPrices = {
  BTC: 62000,
  ETH: 3500,
  SOL: 60
};

const holdings = [
  { name: "BTC", qty: 1.2, avgPrice: 53000 },
  { name: "ETH", qty: 3.5, avgPrice: 1800 },
  { name: "SOL", qty: 5, avgPrice: 150 }
];

const balance = holdings.reduce((total, h) => {
  const currentPrice = currentPrices[h.name] ?? 0;
  return total + h.qty * currentPrice;
}, 0);

const mockBrokerData = {
  balance,
  holdings
};

// Protected route
//Returns static mock broker data
router.post('/connect-broker', auth, (req, res) => {
  const { broker_userId, broker_password } = req.body;

  if (!broker_userId || !broker_password) {
    return res.status(400).json({ error: "Missing broker credentials" });
  }

  // You can validate mock credentials here or just return mock data
  return res.json(mockBrokerData);
});


module.exports = router;
