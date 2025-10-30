import { Router } from "express";
// Controller
import { getAll, getPokemonsByType } from "../controllers/type.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema } from "../schemas/pk.schema.js";
// Creating express router
export const typeRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Pokémon type management
 * components:
 *   schemas:
 *     Type:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Électrik"
 *         color:
 *           type: string
 *           example: "#FFEA70"
 *     TypeWithPokemons:
 *       allOf:
 *         - $ref: '#/components/schemas/Type'
 *         - type: object
 *           properties:
 *             pokemons:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   name:
 *                     type: string
 *                     example: "Salamèche"
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["type not found"]
 */

/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get the list of all Pokémon types
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: A list of Pokémon types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Type'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 8
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Électrik"
 *                   color: "#FFEA70"
 *                 - id: 2
 *                   name: "Feu"
 *                   color: "#FF675C"
 *                 - id: 3
 *                   name: "Eau"
 *                   color: "#0596C7"
 *                 - id: 4
 *                   name: "Plante"
 *                   color: "#49D0B0"
 *                 - id: 5
 *                   name: "Acier"
 *                   color: "#D1D1E0"
 *                 - id: 6
 *                   name: "Combat"
 *                   color: "#E6E0D4"
 *                 - id: 7
 *                   name: "Dragon"
 *                   color: "#97B3E6"
 *                 - id: 8
 *                   name: "Poison"
 *                   color: "#AA6BC8"
 *               meta:
 *                 total: 8
 */
typeRouter.get("/", getAll);

/**
 * @swagger
 * /types/{typeId}:
 *   get:
 *     summary: Get details of a Pokémon type by ID, including associated Pokémon
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: typeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon type
 *         example: 2
 *     responses:
 *       200:
 *         description: Pokémon type details with associated Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TypeWithPokemons'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 2
 *                 name: "Feu"
 *                 color: "#FF675C"
 *                 pokemons:
 *                   - id: 3
 *                     name: "Salamèche"
 *                   - id: 5
 *                     name: "Dracaufeu"
 *               meta:
 *                 total: 1
 *       404:
 *         description: Type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
typeRouter.get("/:typeId", validate("params", pkSchema), getPokemonsByType);
