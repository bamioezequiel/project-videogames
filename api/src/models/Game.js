import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Genres, Platforms, Tags } from "../lib/enums/index.js";
import { User } from "./User.js";

export const Game = sequelize.define("game", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  released: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  main_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  short_screenshots: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },

  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  on_sale: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  features: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  is_new: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  saturated_color: {
    type: DataTypes.STRING,
  },

  dominant_color: {
    type: DataTypes.STRING,
  },

  genres: {
    type: DataTypes.ARRAY(DataTypes.ENUM(...Genres)),
  },

  tags: {
    type: DataTypes.ARRAY(DataTypes.ENUM(...Tags)),
  },

  platforms: {
    type: DataTypes.ARRAY(DataTypes.ENUM(...Platforms)),
  },
});

User.belongsToMany(Game, {
  as: "cart",
  foreignKey: "user_id",
  through: 'Cart',
});

Game.belongsToMany(User, {
  as: "cartGames",
  foreignKey: "cart_id",
  through: 'Cart',
});

User.belongsToMany(Game, {
  as: "favorites",
  foreignKey: "user_id",
  through: 'Favorites',
});

Game.belongsToMany(User, {
  as: "favoritesGames",
  foreignKey: "favorites_id",
  through: 'Favorites',
});
