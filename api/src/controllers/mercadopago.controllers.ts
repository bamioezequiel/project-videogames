import { Request, Response } from "express";
import {
  createPayment,
  notificationPayment,
  getPayment
} from "../services/mercadopago.services";
import { verifyToken } from "../utils/jwt.handle";

export const getPaymentMercadoPago = async (req: Request, res: Response) => {
  const {payment_id} = req.params;
  try {
    const status = await getPayment(payment_id);
    res.send({status});
  } catch (error) {
    console.log(error);
  }
};

export const checkoutMercadoPago = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const tokenData: any = verifyToken(`${token}`);
    const payment = await createPayment(tokenData.id);

    res.json(payment);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const notificationMercadoPago = async (req: Request, res: Response) => {
  try {
    res.status(200).send("ok");
    console.log(req.body.action);
    if (req.body.action === "payment.created") {
      await notificationPayment(req.body);
    }
  } catch (error) {
    console.log(error);
  }
};
