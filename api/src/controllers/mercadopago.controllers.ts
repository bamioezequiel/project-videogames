import { Request, Response } from "express";
import { createPayment, notificationPayment } from "../services/mercadopago.services";
import { verifyToken } from "../utils/jwt.handle";

export const checkoutMercadoPago = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const tokenData: any = verifyToken(`${token}`);
    const payment = await createPayment(tokenData.id);    
    
    res.json(payment);
  } catch (error) {
    console.log(error);
    res.send(error)
  }
};

export const notificationMercadoPago = async (req: Request, res: Response) => {
  try {
    res.status(200).send("ok");
    console.log(req.body.action);
    if (req.body.action === "payment.created") {
     const status = await notificationPayment(req.body);
     res.send(status)
    }
  } catch (error) {
    console.log(error);
  }
}