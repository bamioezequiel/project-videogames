import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Game } from "./Game.js";
import { Order } from "./Order.js";

export const Favorites = sequelize.define(
  "favorites",
  {
    favorites: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    }
  }
);

User.hasMany(Favorites);
Favorites.belongsTo(User);

Game.belongsToMany(Favorites, { through: Order });
Favorites.belongsToMany(Game, { through: Order });
