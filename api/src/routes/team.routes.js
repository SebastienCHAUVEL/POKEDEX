import { Router } from "express";
// Controller
import {
  getAll,
  getModal,
  removeTeam,
  createTeam,
  updateName,
  addPokemonInTeam,
  removePokemonInTeam,
} from "../controllers/team.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema, pokemonTeamPkSchema } from "../schemas/pk.schema.js";
import { createSchema, updateNameSchema } from "../schemas/team.schema.js";
// Authentication
import { checkAuth, checkUserTeam } from "../middlewares/auth.middleware.js";
// Creating express router
export const teamRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management for Pokémon
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     TeamBase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Ultimate Team"
 *         description:
 *           type: string
 *           example: "La meilleure team du monde"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-29T14:07:57.725Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-29T14:07:57.725Z"
 *         userId:
 *           type: integer
 *           example: 1
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
 *     PokemonInTeam:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         name:
 *           type: string
 *           example: "Bulbizarre"
 *         types:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PokemonType'
 *     TeamWithPokemons:
 *       allOf:
 *         - $ref: '#/components/schemas/TeamBase'
 *         - type: object
 *           properties:
 *             pokemons:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PokemonInTeam'
 *             pokemonCount:
 *               type: integer
 *               example: 6
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["team not found"]
 */

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get the list of all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TeamBase'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 8
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Ultimate Team"
 *                   description: "La meilleure team du monde"
 *                   createdAt: "2025-10-29T14:07:57.725Z"
 *                   updatedAt: "2025-10-29T14:07:57.725Z"
 *                   userId: 1
 *                 - id: 2
 *                   name: "Squad fofolle"
 *                   description: "Pour tout gagne"
 *                   createdAt: "2025-10-29T14:07:57.726Z"
 *                   updatedAt: "2025-10-29T14:07:57.726Z"
 *                   userId: 1
 *               meta:
 *                 total: 8
 */
teamRouter.get("/", getAll);

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouvelle équipe"
 *               description:
 *                 type: string
 *                 example: "La nouvelle équipe de pokémons @#!6'"
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Team successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TeamBase'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 12
 *                 name: "Nouvelle équipe"
 *                 description: "La nouvelle équipe de pokémons @#!6'"
 *                 userId: 3
 *                 updatedAt: "2025-10-30T13:45:32.609Z"
 *                 createdAt: "2025-10-30T13:45:32.609Z"
 *               meta:
 *                 total: 1
 *       401:
 *         description: Unauthorized (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouter.post("/", checkAuth, validate("body", createSchema), createTeam);

/**
 * @swagger
 * /teams/{teamId}:
 *   get:
 *     summary: Get details of a team by ID, including associated Pokémon
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team
 *         example: 5
 *     responses:
 *       200:
 *         description: Team details with associated Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TeamWithPokemons'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 5
 *                 name: "Team modifié"
 *                 description: "La nouvelle équipe de pokémons @#!6'"
 *                 createdAt: "2025-10-29T14:15:33.292Z"
 *                 updatedAt: "2025-10-29T14:16:15.025Z"
 *                 userId: 3
 *                 pokemons:
 *                   - id: 2
 *                     name: "Bulbizarre"
 *                     types:
 *                       - id: 4
 *                         name: "Plante"
 *                         color: "#49D0B0"
 *                       - id: 8
 *                         name: "Poison"
 *                         color: "#AA6BC8"
 *                   - id: 3
 *                     name: "Salamèche"
 *                     types:
 *                       - id: 2
 *                         name: "Feu"
 *                         color: "#FF675C"
 *                 pokemonCount: 6
 *               meta:
 *                 total: 1
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouter.get("/:teamId", validate("params", pkSchema), getModal);

/**
 * @swagger
 * /teams/{teamId}:
 *   delete:
 *     summary: Remove a team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to remove
 *         example: 5
 *     responses:
 *       204:
 *         description: Team successfully removed
 *       401:
 *         description: Unauthorized (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden (user does not own the team)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouter.delete("/:teamId", checkAuth, checkUserTeam, removeTeam);

/**
 * @swagger
 * /teams/{teamId}:
 *   patch:
 *     summary: Update the name of a team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team to update
 *         example: 8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Team modifié"
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Team name successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TeamBase'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 8
 *                 name: "Team modifié"
 *                 description: "La nouvelle équipe de pokémons @#!6'"
 *                 createdAt: "2025-10-29T16:12:34.304Z"
 *                 updatedAt: "2025-10-30T13:48:38.765Z"
 *                 userId: 3
 *               meta:
 *                 total: 1
 *       401:
 *         description: Unauthorized (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden (user does not own the team)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouter.patch(
  "/:teamId",
  checkAuth,
  checkUserTeam,
  validate("body", updateNameSchema),
  updateName
);

/**
 * @swagger
 * /teams/{teamId}/pokemons/{pokemonId}:
 *   put:
 *     summary: Add a Pokémon to a team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team
 *         example: 7
 *       - in: path
 *         name: pokemonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon to add
 *         example: 4
 *     responses:
 *       200:
 *         description: Pokémon successfully added to the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TeamWithPokemons'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *             example:
 *               data:
 *                 id: 7
 *                 name: "Team modifié"
 *                 description: "La nouvelle équipe de pokémons @#!6'"
 *                 createdAt: "2025-10-29T14:53:34.569Z"
 *                 updatedAt: "2025-10-29T14:53:42.507Z"
 *                 userId: 3
 *                 pokemons:
 *                   - id: 4
 *                     name: "Carapuce"
 *                     types:
 *                       - id: 3
 *                         name: "Eau"
 *                         color: "#0596C7"
 *                 pokemonCount: 1
 *               meta:
 *                 total: 1
 *       400:
 *         description: Bad request (e.g., team already has 6 Pokémon)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden (user does not own the team)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Team or Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouter.put(
  "/:teamId/pokemons/:pokemonId",
  checkAuth,
  checkUserTeam,
  validate("params", pokemonTeamPkSchema),
  addPokemonInTeam
);

/**
 * @swagger
 * /teams/{teamId}/pokemons/{pokemonId}:
 *   delete:
 *     summary: Remove a Pokémon from a team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the team
 *         example: 7
 *       - in: path
 *         name: pokemonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Pokémon to remove
 *         example: 4
 *     responses:
 *       204:
 *         description: Pokémon successfully removed from the team
 *       400:
 *         description: Bad request (e.g., Pokémon not found in the team)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized (user not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden (user does not own the team)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Team or Pokémon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
teamRouter.delete(
  "/:teamId/pokemons/:pokemonId",
  checkAuth,
  checkUserTeam,
  validate("params", pokemonTeamPkSchema),
  removePokemonInTeam
);
