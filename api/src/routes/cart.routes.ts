import { Router } from "express";
import { addGameInCart, getCart, removeGamesFromCart } from "../controllers/cart.controllers";

const router = Router();

router.get("/:id", getCart);
router.post("/addGame/:id", addGameInCart);
router.delete("/:id", removeGamesFromCart);

export default router;
