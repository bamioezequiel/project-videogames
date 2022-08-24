import { Router } from "express";
import { addCart, deleteCart, getCart } from "../controllers/cart.controllers.js";
const router = Router();

router.get('/:id', getCart);
router.post('/:id', addCart);
router.delete('/:id', deleteCart);

export default router;