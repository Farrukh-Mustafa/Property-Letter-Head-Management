import { Router } from "express";
import { addLetterHead, getLetterHead } from "../controllers/letterhead.controller";
import { requireUser } from "../middlewares/auth.middleware";

export const LetterHeadRouter: Router = Router();

LetterHeadRouter.post("/add", requireUser, addLetterHead);
LetterHeadRouter.post("/get", getLetterHead);
