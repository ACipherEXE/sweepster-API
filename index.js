const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const server = express();
const port = process.env.PORT || 8181;
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

// Enable CORS for all routes
server.use(cors());

// Use the master key authentication middleware
server.use(masterKeyAuthMiddleware);

// Custom login route
server.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const users = require("./hotels.json").users;

  // Search for the user with the provided email
  const user = users.find((user) => user.email === email);

  // If user not found or password doesn't match, return error
  if (!user || user.pass !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // If password matches, construct and send user data
  const userData = {
    userId: user.user_id,
    nickname: user.nickname,
    hotelId: user.Hotel_Number,
  };
  res.json(userData);
});

// Mount JSON Server with the --id option to force ID generation
const jsonServerRouter = jsonServer.router("hotels.json", { id: "id" });
server.use("/api", jsonServerRouter);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
