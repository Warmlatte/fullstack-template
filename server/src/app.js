import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import testRoute from "./routes/test.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/test", testRoute);

// Error Handler
app.use(errorMiddleware);

// Test Route
app.get("/", (_req, res) => {
  res.send("API is running 🚀");
});

<<<<<<< HEAD
export default app;
=======
export default app;
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
