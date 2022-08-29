import { Router } from "express";
import { getPlatforms } from "../controllers/platforms.controllers.js";
const router = Router();

router.get('/', getPlatforms);

export default router;