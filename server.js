const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet"); // Fixed typo: helment -> helmet
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // Accept all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};

// Apply cors middleware before other middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet()); // Fixed typo
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user");

app.use("/api/auth", userRouter);

// Add error handling for CORS preflight
app.options("*", cors(corsOptions));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;