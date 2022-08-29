import { Router } from "express";
import { getGenres } from "../controllers/genres.controllers.js";
const router = Router();

router.get('/', getGenres);

export default router;