import { Router } from "express";
import { PaymentCreate } from "../controllers/payment.controllers.js";

const router = Router();

router.post("/", PaymentCreate);
router.post("/webhook");

export default router;