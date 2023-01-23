import { Router } from "express";
import { deleteGame, featuredGame, getAllGames, getGamesById, isNewGame, postGame, putGame, statusGame } from "../controllers/games.controllers";
const router = Router();

router.get('/', getAllGames);
router.post('/', postGame);
router.put('/', putGame);
router.get('/:id', getGamesById);
router.delete('/:id', deleteGame);
router.patch('/status/:id', statusGame);
router.patch('/isNew/:id', isNewGame); 
router.patch('/featured/:id', featuredGame);

export default router;