import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Game } from "./Game.js";
import { Order } from "./Order.js";

export const Cart = sequelize.define(
  "cart",
  {
    status: {
      type: DataTypes.ENUM("En proceso", "Completado", "Vacio"),
      defaultValue: "Vacio",
    },
    cart: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    paranoid: true,
    deletedAt: "deleteAt",
  }
);

User.hasMany(Cart);
Cart.belongsTo(User);

Game.belongsToMany(Cart, { through: Order });
Cart.belongsToMany(Game, { through: Order });
