import { Router } from "express";
import { getTags } from "../controllers/tags.controllers.js";
const router = Router();

router.get('/', getTags);

export default router;