import { model, Schema } from "mongoose";
import { Order } from "../interfaces/order.interface";
import { Game } from "../interfaces/game.interface";

const OrderSchema = new Schema<Order>(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      required: true,
      type: String,
    },
    cart: {
      required: true,
      type: Array<Game>,
      default: [],
    },
    price: {
      required: true,
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OrderModel = model("order", OrderSchema);
export default OrderModel;
