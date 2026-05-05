const express = require("express");
const cors = require("cors");

const { getAuthToken } = require("../logging_middleware/auth");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to ensure token is available
app.use(async (req, res, next) => {
  next();
});

// routes
app.use("/notifications", notificationRoutes);
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // generate token on start
  try {
    await getAuthToken();
    console.log("Initial token generated successfully");
  } catch (err) {
    console.error("Failed to generate initial token:", err.message);
  }
});