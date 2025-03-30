const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

// CORS configuration to allow all origins
const corsOptions = {
  origin: "*", // Allow all origins as requested
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};

// Apply cors middleware before other middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
// Configure helmet with less restrictive settings for APIs
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Add a health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const userRouter = require("./routes/user");

app.use("/api/auth", userRouter);

// Add error handling for CORS preflight
app.options("*", cors(corsOptions));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err.stack
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server with error handling
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

module.exports = app;