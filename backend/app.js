const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Chat AI Backend Running Successfully 🚀"
  });
});


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/chat", chatRoutes);


module.exports = app;