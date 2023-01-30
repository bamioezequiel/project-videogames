import { model, Schema } from "mongoose";
import { Cart } from "../interfaces/cart.interface";
import { Game } from "../interfaces/game.interface";

const CartSchema = new Schema<Cart>(
  {
    status: {
      /*       type: DataTypes.ENUM(["processed", "completed", "canceled"]), */      
      type: String,
      default: "processed",
    },
    cart: {
      type: Array<Game>,
      default: []
    },
    total: {
      type: Number,
      default: 0
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
