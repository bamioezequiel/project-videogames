import "dotenv/config";
import { Cart } from "../models/Cart.js";
import Stripe from "stripe";
import { Game } from "../models/Game.js";
const stripe = Stripe(process.env.SK_STRIPE);

// import { statusCartFunction, statusOrderFunction } from '../controllers/OrdersController.js';
// import { paidEmail } from '../email/email.js';

let endpointSecret;
let idP = [];
endpointSecret =
  "whsec_44376a5cc4a2dc4fd0323c53cbc2b5c78268575b9aef202873df2a536f8b90fa";

export const PaymentCreate = async (req, res) => {
  let cart = req.body;
  let id = cart.id;

  try {
    const cart = await Cart.findOne({
      where: {
        id,
        status: "In process",
      },
    });
    cart.cart = await Game.findAll({
      where: {
        id: cart.cart,
      },
    });

    const itemsCart = cart.cart?.map((g) => ({
      quantity: 1,
      gameId: g.id,
      gameName: g.name,
      totalPerUnitCents: g.price * 100,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      metadata: { order: id },
      line_items: itemsCart.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.gameName,
            },
            unit_amount: item.totalPerUnitCents,
          },
          quantity: item.quantity,
        };
      }),
      client_reference_id: id,
      success_url: "http://localhost:3000/checkout/success",
      cancel_url: "http://localhost:3000/",
      /* success_url: process.env.NODE_ENV === 'production' ? 'https://proyecto-final-henry.vercel.app/checkout/confirmation' :'http://localhost:3000/checkout/confirmation',
           cancel_url: process.env.NODE_ENV === 'production' ? 'https://proyecto-final-henry.vercel.app/checkout' :'http://localhost:3000/checkout' */
    });
    await stripe.paymentIntents.create({
      amount: Number(cart.price) * 100,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { order: id },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const PaymentResponse = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  console.log("Hero 0");
  let data;
  let eventType;
  try {
    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
    let event;
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
    console.log("Here");
    data = event.data.object;
    console.log(event.data.object);
    eventType = event.type;
    console.log(eventType);
    if (eventType === "payment_intent.created") {
      idP.push(event.data.object.id);
      const paymentIntent = await stripe.paymentIntents.retrieve(idP[0]);
    }
    console.log("Here 2");
    if (eventType === "charge.failed") {
      let idA;
      if (idP.length > 1) {
        idA = idP[idP.length - 1];
      } else {
        idA = idP[0];
      }
      const paymentIntent = await stripe.paymentIntents.retrieve(idA);
      let id = Number(paymentIntent.metadata.order);
      await statusCart(id, "Cancel");
      // paidEmail(id, 'cancel');
    }
    console.log("Here 3");

    if (eventType === "checkout.session.completed") {
      const id = req.body.data.object.client_reference_id;
      // console.log('ID')
      // console.log(req.body.data.object.client_reference_id)
      if (data.payment_status === "paid") {
        console.log(data.payment_status);
        const respuesta = await statusCart(id, "Completed");
        // paidEmail(id, 'paid');
      }
    }
    console.log("Here 3");

    res.send(200);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(200).send(`Webhook Error: ${err.message}`);
    return;
  }
};
