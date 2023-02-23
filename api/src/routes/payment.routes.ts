import { Router } from "express";
import { checkoutMercadoPago, getPaymentMercadoPago, notificationMercadoPago } from "../controllers/mercadopago.controllers";

const router = Router();

router.get("/:payment_id", getPaymentMercadoPago);
router.post("/mp", checkoutMercadoPago);
router.post("/mp/notification", notificationMercadoPago);

export default router;