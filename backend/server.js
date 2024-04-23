// server.js
require("dotenv").config();

const express = require("express");
const connectDB = require("./src/db/db");

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const games = require("./src/routers/games");
const roles = require("./src/routers/roles");
const auth = require("./src/routers/auth");

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure your Express app by setting various HTTP headers
app.use(limiter); // Apply rate limiting
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.use("/games", games);
app.use("/roles", roles);
app.use("/auth", auth);

// Start the server
const PORT = process.env.PORT || 5001; // Use the PORT environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server's running port
});
