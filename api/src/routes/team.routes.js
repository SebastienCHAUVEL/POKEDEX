import { Router } from "express";
import { getAll, getModal } from "../controllers/team.controller.js";

export const teamRouter = Router();

teamRouter.get("/", getAll);
teamRouter.get("/:id", getModal);
