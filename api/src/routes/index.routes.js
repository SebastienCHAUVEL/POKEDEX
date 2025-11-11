import { Router } from "express";
// Swagger
import swaggerUi from "swagger-ui-express";
import { specs } from "../utils/swagger.utils.js";
// Routers
import { pokemonRouter } from "./pokemon.routes.js";
import { teamRouter } from "./team.routes.js";
import { typeRouter } from "./type.routes.js";
import { authRouter } from "./auth.routes.js";

export const router = Router();

// API Routes
router.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
router.use("/auth", authRouter);
router.use("/pokemons", pokemonRouter);
router.use("/teams", teamRouter);
router.use("/types", typeRouter);
