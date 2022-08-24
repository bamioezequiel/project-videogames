import { Router } from "express";
import { addFavorites, deleteFavorites, getFavorites } from "../controllers/favorites.controllers.js";
const router = Router();

router.get('/:id', getFavorites);
router.post('/:id', addFavorites);
router.delete('/:id', deleteFavorites);

export default router;