const express = require("express");
const jsonServer = require("json-server");

const server = express();

// Define your master key
const MASTER_KEY = "your_master_key";

// Middleware to check the master key in headers
const masterKeyAuthMiddleware = (req, res, next) => {
  const providedKey = req.headers["x-master-key"];

  if (!providedKey || providedKey !== MASTER_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // If the master key is valid, proceed to the next middleware
  next();
};

// Use the master key authentication middleware
server.use(masterKeyAuthMiddleware);

// Mount JSON Server
const jsonServerRouter = jsonServer.router("hotels.json"); // Replace 'db.json' with your JSON data file
server.use("/api", jsonServerRouter);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
