import { Router } from "express";
import { getGenres, getPlatforms, getTags } from "../controllers/categories.controllers";
const router = Router();

router.get('/', getPlatforms);
router.get('/', getGenres);
router.get('/', getTags);

export default router;