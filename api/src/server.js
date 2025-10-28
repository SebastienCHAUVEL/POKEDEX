// Node modules
import express from "express";
import cors from "cors";
// Local modules
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { addResponseMethodsMiddleware } from "./middlewares/response.middleware.js";
import { pokemonRouter } from "./routes/pokemon.routes.js";
import { teamRouter } from "./routes/team.routes.js";
import { typeRouter } from "./routes/type.routes.js";

// Creating app from express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(addResponseMethodsMiddleware);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});
app.use("/pokemons", pokemonRouter);
app.use("/teams", teamRouter);
app.use("/types", typeRouter);

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
