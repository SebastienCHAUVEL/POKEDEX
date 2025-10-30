import { Router } from "express";
// Controller
import {
  getAll,
  getModal,
  getComparedPokemon,
  addVote,
  getVotes,
  getPodium,
  removeVote,
} from "../controllers/pokemon.controller.js";
// Schema
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema, comparePokemonsPkSchema } from "../schemas/pk.schema.js";
// Authentication
import { checkAuth } from "../middlewares/auth.middleware.js";
// Creating express router
export const pokemonRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Pokemons
 *   description: Pokémon management, voting, and comparison
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     PokemonBase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Pikachu"
 *         hp:
 *           type: integer
 *           example: 35
 *         atk:
 *           type: integer
 *           example: 55
 *         def:
 *           type: integer
 *           example: 40
 *         atk_spe:
 *           type: integer
 *           example: 50
 *         def_spe:
 *           type: integer
 *           example: 50
 *         speed:
 *           type: integer
 *           example: 90
 *     PokemonType:
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
 *     PokemonWithTypes:
 *       allOf:
 *         - $ref: '#/components/schemas/PokemonBase'
 *         - type: object
 *           properties:
 *             types:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PokemonType'
 *     PokemonWithVotes:
 *       allOf:
 *         - $ref: '#/components/schemas/PokemonBase'
 *         - type: object
 *           properties:
 *             votes:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   username:
 *                     type: string
 *                     example: "user42"
 *                   VotePokemons:
 *                     type: object
 *                     properties:
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-29T18:02:16.424Z"
 *             totalVotes:
 *               type: integer
 *               example: 1
 *     PokemonWithVotesCount:
 *       allOf:
 *         - $ref: '#/components/schemas/PokemonBase'
 *         - type: object
 *           properties:
 *             votesCount:
 *               type: string
 *               example: "1"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-29T14:07:57.665Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-29T14:07:57.665Z"
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["pokemon not found"]
 */

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Get the list of all Pokémon
 *     tags: [Pokemons]
 *     responses:
 *       200:
 *         description: A list of Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PokemonBase'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 7
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Pikachu"
 *                   hp: 35
 *                   atk: 55
 *                   def: 40
 *                   atk_spe: 50
 *                   def_spe: 50
 *                   speed: 90
 *                 - id: 2
 *                   name: "Bulbizarre"
 *                   hp: 45
 *                   atk: 49
 *                   def: 49
 *                   atk_spe: 65
 *                   def_spe: 65
 *                   speed: 45
 *               meta:
 *                 total: 7
 */
pokemonRouter.get("/", getAll);

/**
 * @swagger
 * /pokemons/votes:
 *   get:
 *     summary: Get the podium of the most voted Pokémon
 *     tags: [Pokemons]
 *     responses:
 *       200:
 *         description: A list of the top Pokémon by votes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PokemonWithVotesCount'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 3
 *             example:
 *               data:
 *                 - id: 3
 *                   name: "Salamèche"
 *                   hp: 39
 *                   atk: 52
 *                   def: 43
 *                   atk_spe: 60
 *                   def_spe: 50
 *                   speed: 65
 *                   createdAt: "2025-10-29T14:07:57.668Z"
 *                   updatedAt: "2025-10-29T14:07:57.668Z"
 *                   votesCount: "1"
 *                 - id: 2
 *                   name: "Bulbizarre"
 *                   hp: 45
 *                   atk: 49
 *                   def: 49
 *                   atk_spe: 65
 *                   def_spe: 65
 *                   speed: 45
 *                   createdAt: "2025-10-29T14:07:57.667Z"
 *                   updatedAt: "2025-10-29T14:07:57.667Z"
 *                   votesCount: "1"
 *               meta:
 *                 total: 3
 */
pokemonRouter.get("/votes", getPodium);

/**
 * @swagger
 * /pokemons/names/{pokemonName}:
 *   get:
 *     summary: Get details of a Pokémon by name (case insensitive, partial match)
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: pokemonName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the Pokémon (or partial name)
 *         example: "pika"
 *     responses:
 *       200:
 *         description: Pokémon details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/PokemonWithTypes'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 1
 *                 name: "Pikachu"
 *                 hp: 35
 *                 atk: 55
 *                 def: 40
 *                 atk_spe: 50
 *                 def_spe: 50
 *                 speed: 90
 *                 types:
 *                   - id: 1
 *                     name: "Électrik"
 *                     color: "#FFEA70"
 *               meta:
 *                 total: 1
 *       404:
 *         description: Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouter.get("/names/:pokemonName", getModal);

/**
 * @swagger
 * /pokemons/{pokemonId}:
 *   get:
 *     summary: Get details of a Pokémon by ID
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon
 *         example: 1
 *     responses:
 *       200:
 *         description: Pokémon details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/PokemonWithTypes'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 1
 *                 name: "Pikachu"
 *                 hp: 35
 *                 atk: 55
 *                 def: 40
 *                 atk_spe: 50
 *                 def_spe: 50
 *                 speed: 90
 *                 types:
 *                   - id: 1
 *                     name: "Électrik"
 *                     color: "#FFEA70"
 *               meta:
 *                 total: 1
 *       404:
 *         description: Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouter.get("/:pokemonId", getModal);

/**
 * @swagger
 * /pokemons/{pokemonId}/votes:
 *   put:
 *     summary: Vote for a Pokémon
 *     tags: [Pokemons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon to vote for
 *         example: 1
 *     responses:
 *       200:
 *         description: Vote successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/PokemonWithVotes'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 1
 *                 name: "Pikachu"
 *                 votes:
 *                   - id: 3
 *                     username: "user42"
 *                     VotePokemons:
 *                       createdAt: "2025-10-29T18:02:16.424Z"
 *                 totalVotes: 1
 *               meta:
 *                 total: 1
 *       401:
 *         description: Unauthorized (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouter.put(
  "/:pokemonId/votes",
  validate("params", pkSchema),
  checkAuth,
  addVote
);

/**
 * @swagger
 * /pokemons/{pokemonId}/votes:
 *   delete:
 *     summary: Remove a vote for a Pokémon
 *     tags: [Pokemons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon to remove the vote from
 *         example: 2
 *     responses:
 *       204:
 *         description: Vote successfully removed
 *       401:
 *         description: Unauthorized (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouter.delete(
  "/:pokemonId/votes",
  validate("params", pkSchema),
  checkAuth,
  removeVote
);

/**
 * @swagger
 * /pokemons/{pokemonId}/votes:
 *   get:
 *     summary: Get the votes for a Pokémon
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon
 *         example: 2
 *     responses:
 *       200:
 *         description: Votes for the Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/PokemonWithVotes'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 2
 *                 name: "Bulbizarre"
 *                 votes:
 *                   - id: 3
 *                     username: "user42"
 *                     VotePokemons:
 *                       createdAt: "2025-10-29T18:02:08.067Z"
 *                 totalVotes: 1
 *               meta:
 *                 total: 1
 *       404:
 *         description: Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouter.get("/:pokemonId/votes", validate("params", pkSchema), getVotes);

/**
 * @swagger
 * /pokemons/compare/{pokemonId}/{idToCompare}:
 *   get:
 *     summary: Compare two Pokémon
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: pokemonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the first Pokémon
 *         example: 1
 *       - in: path
 *         name: idToCompare
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the second Pokémon
 *         example: 2
 *     responses:
 *       200:
 *         description: Comparison result between the two Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PokemonWithTypes'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 2
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Pikachu"
 *                   hp: 35
 *                   atk: 55
 *                   def: 40
 *                   atk_spe: 50
 *                   def_spe: 50
 *                   speed: 90
 *                   types:
 *                     - id: 1
 *                       name: "Électrik"
 *                       color: "#FFEA70"
 *                 - id: 2
 *                   name: "Bulbizarre"
 *                   hp: 45
 *                   atk: 49
 *                   def: 49
 *                   atk_spe: 65
 *                   def_spe: 65
 *                   speed: 45
 *                   types:
 *                     - id: 4
 *                       name: "Plante"
 *                       color: "#49D0B0"
 *                     - id: 8
 *                       name: "Poison"
 *                       color: "#AA6BC8"
 *               meta:
 *                 total: 2
 *       400:
 *         description: Cannot compare the same Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: One or both Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRouter.get(
  "/compare/:pokemonId/:idToCompare",
  validate("params", comparePokemonsPkSchema),
  getComparedPokemon
);
