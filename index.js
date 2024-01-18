const express = require("express");
const jsonServer = require("json-server");

const server = express();
const port = process.env.PORT || 8181;
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
const jsonServerRouter = jsonServer.router("hotels.json");
server.use("/api", jsonServerRouter);

// Start the server
server.listen(port, () => {
  console.log(`1Server is running on http://localhost:${port} `);
});
