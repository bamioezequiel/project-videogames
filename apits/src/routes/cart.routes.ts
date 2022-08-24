import { Router } from "express";
import { addCart, deleteCart, getCart, getDeleteCart } from "../controllers/cart.controllers";
const router = Router();

router.get('/:id', getCart);
router.get('/:id', getDeleteCart);
router.post('/:id', addCart);
router.delete('/:id', deleteCart);

export default router;