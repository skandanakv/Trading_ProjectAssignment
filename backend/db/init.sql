CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT UNIQUE,
  password TEXT,
  email TEXT,
  mobile TEXT,
  broker_userId TEXT,
  broker_password TEXT
);
