// Node modules
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./utils/swagger.utils.js";
// Local modules
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { addResponseMethodsMiddleware } from "./middlewares/response.middleware.js";
import { pokemonRouter } from "./routes/pokemon.routes.js";
import { teamRouter } from "./routes/team.routes.js";
import { typeRouter } from "./routes/type.routes.js";
import { authRouter } from "./routes/auth.routes.js";

// Creating app from express
const app = express();

// Middlewares
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(addResponseMethodsMiddleware); // Add methods in res Object for standars responses

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/auth", authRouter);
app.use("/pokemons", pokemonRouter);
app.use("/teams", teamRouter);
app.use("/types", typeRouter);

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
