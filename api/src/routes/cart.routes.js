import { Router } from "express";
import { addItemCart, deleteItemCart, getCart } from "../controllers/cart.controllers.js";
const router = Router();

router.get('/:id', getCart);
router.put('/:id', addItemCart);
router.delete('/:id/:gameId', deleteItemCart);
// router.delete('/:id', deleteCart);

export default router;