import { model, Schema } from "mongoose";
import { Cart } from "../interfaces/cart.interface";
import { Game } from "../interfaces/game.interface";

const CartSchema = new Schema<Cart>(
  {
    cart: {
      type: Array<Game>,
      default: []
    },    
    userId: {
      required: true,
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CartModel = model("carts", CartSchema);
export default CartModel;
