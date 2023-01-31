import { Router } from "express";
import { getGenres, getPlatforms, getTags } from "../controllers/categories.controllers";
const router = Router();

router.get('/platforms', getPlatforms);
router.get('/genres', getGenres);
router.get('/tags', getTags);

export default router;