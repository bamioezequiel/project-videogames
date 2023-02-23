import axios from "axios";
import { Game } from "../interfaces/game.interface";
import CartModel from "../models/cart.model";
// import OrderModel from "../models/order.models";
// import UserModel from "../models/user.models";
// import { addCoinsUser } from "./coin.services";
const URL_FRONT = process.env.URL_FRONT;

export const getPayment = async (payment_id: string) => {
  const url = `https://api.mercadopago.com/v1/payments/${payment_id}`;
  const payment = await axios(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
    },
  });
  return payment.status;
}

  export const createPayment = async (userId: string) => {
  const url = "https://api.mercadopago.com/checkout/preferences";

  let cart: any = await CartModel.findOne({
    userId,
    status: "processed",
  });
  const bodyItems = cart.cart?.map((el: Game) => {
    return {
      title: el.name,
      description: cart._id,
      picture_url: el.main_image,
      category_id: "category123",
      quantity: 1,
      unit_price: el.on_sale > 0 ? el.price_with_sale : el.price,
    };
  });

  const body = {
    items: bodyItems,
    back_urls: {
      failure: `${URL_FRONT}`,
      pending: `${URL_FRONT}`, 
      success: `${URL_FRONT}`,
    },
  };
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
    },
  });

  return payment.data;
};

export const notificationPayment = async (body: any) => {
  const infoPago = await axios.get(
    `https://api.mercadopago.com/v1/payments/${body.data.id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
      },
    }
  );
  let status = infoPago.data.status;
  console.log(infoPago.data);
  if (status === "rejected") status = "cancelled";
  /*   console.log(infoPago.data) */
  if (status === "approved" || status === "cancelled") {
    const cartId = infoPago.data.additional_info.items[0].description;
    await CartModel.findOneAndUpdate(
      {
        _id: cartId,
      },
      { status }
    );
  }
};
