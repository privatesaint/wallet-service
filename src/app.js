import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// initialize express app
const app = express();

// import env variables
dotenv.config();

// import local files
import errorMiddleware from "./middleware/errors";
import ErrorHandler from "./utils/ErrorHandler";

// Handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  process.exit(1);
});

// routes
import routes from "./routes";

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup CORS
app.use(cors());

// routes
app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to wallet service using paystack api",
  });
});

app.use("/api", routes);

// Handle invalid routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// error handler
app.use(errorMiddleware);

export default app;
