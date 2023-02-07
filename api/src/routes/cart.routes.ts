import { Router } from "express";
import { addGameInCart, getAllCart, getCart, removeGamesFromCart } from "../controllers/cart.controllers";

const router = Router();

router.get("/:id", getCart);
router.get("/all/:id", getAllCart);
router.post("/addGame/:id", addGameInCart);
router.delete("/:id", removeGamesFromCart);

export default router;
