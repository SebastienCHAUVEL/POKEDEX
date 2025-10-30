import { Router } from "express";
// Controller
import { register, login } from "../controllers/auth.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { registerUserSchema, loginUserSchema } from "../schemas/user.schema.js";

export const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and registration
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 23
 *         username:
 *           type: string
 *           example: "user42"
 *     AuthToken:
 *       type: object
 *       properties:
 *         data:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE3NjE4Mjg4NzgsImV4cCI6MTc2MTg0MzI3OH0.kvI44DhPMT6TlcOvi-L1bNDFw975WlhCactWcdlGXHQ"
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 1
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Error message"]
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user42"
 *               password:
 *                 type: string
 *                 example: "je suis le roi du mondE1!#é"
 *               validation:
 *                 type: string
 *                 example: "je suis le roi du mondE1!#é"
 *             required:
 *               - username
 *               - password
 *               - validation
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad request (e.g., password and validation do not match)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict (e.g., username already exists)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRouter.post("/register", validate("body", registerUserSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user42"
 *               password:
 *                 type: string
 *                 example: "je suis le roi du mondE1!#é"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       401:
 *         description: Unauthorized (e.g., invalid username or password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
authRouter.post("/login", validate("body", loginUserSchema), login);
