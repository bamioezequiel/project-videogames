import { Router } from "express";
import { deleteGame, getAllGames, getGamesById, postGame, putGame, restoreGame } from "../controllers/games.controllers.js";
const router = Router();

router.get('/', getAllGames);
router.post('/', postGame);
router.put('/', putGame);
router.get('/:id', getGamesById);
router.delete('/:id', deleteGame);
router.patch('/:id', restoreGame);

/* 
faltan las rutas:
- patch destacados
- patch es nuevo
- patch activo
*/

export default router;