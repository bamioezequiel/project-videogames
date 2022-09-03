import { Router } from "express";
import { getGamesFiltered } from "../controllers/gamesFiltersAndOrders.controllers.js";
import { deleteGame, getAllGames, getGamesById, postGame, putGame, restoreGame } from "../controllers/games.controllers.js";
const router = Router();

router.get('/', getAllGames);
router.post('/filters', getGamesFiltered);
router.post('/', postGame);
router.put('/', putGame);
router.get('/:id', getGamesById);
router.delete('/:id', deleteGame);
router.patch('/:id', restoreGame);

export default router;