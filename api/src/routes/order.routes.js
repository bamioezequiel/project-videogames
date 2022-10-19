import { Router } from "express";
import {
  newOrder,
  getOrder,
  patchStatusOrder,
} from "./../controllers/order.controllers";
const router = Router();

router.post("/:id", newOrder);
router.get("/", getOrder);
router.patch("/:id", patchStatusOrder);
// router.delete('/:id', deleteCart);

export default router;
