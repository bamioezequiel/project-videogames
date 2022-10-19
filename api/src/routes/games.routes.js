import { Router } from "express";
import { deleteGame, getAllGames, getGamesById, postGame, putGame, restoreGame, isNewGame, featuredGame } from "../controllers/games.controllers.js";
const router = Router();

router.get('/', getAllGames);
router.post('/', postGame);
router.put('/', putGame);
router.get('/:id', getGamesById);
router.delete('/:id', deleteGame);
router.patch('/restore/:id', restoreGame);
router.patch('/isNew/:id', isNewGame);
router.patch('/featured/:id', featuredGame);

/* 
faltan las rutas:
- patch destacados
- patch es nuevo
- patch activo
*/

export default router;