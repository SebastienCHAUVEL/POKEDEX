// Node modules
import express from "express";
import cors from "cors";
// Local modules
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { addResponseMethodsMiddleware } from "./middlewares/response.middleware.js";
// Router
import { router } from "./routes/index.routes.js";

// Creating app from express
const app = express();

// Middlewares
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(addResponseMethodsMiddleware); // Add methods in res Object for standars responses

// Routes
app.use(router);

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
