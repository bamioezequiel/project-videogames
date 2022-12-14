import { DataTypes } from "sequelize";
import { sequelize } from "./../../db.js";
import { Genres, Platforms, Tags } from "../lib/enums/index.js";
import { User } from "./User.js";

export const Game = sequelize.define(
  "game",
  {
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
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    price_with_sale: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      get() {
        return (
          this.getDataValue("price") -
          (this.getDataValue("price") * this.getDataValue("on_sale")) / 100
        );
      },
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

    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  },
  {
    paranoid: true,
    deletedAt: "deleteAt",
  }
);

User.belongsToMany(Game, {
  as: "favorites",
  foreignKey: "user_id",
  through: "Favorites",
});

Game.belongsToMany(User, {
  as: "favoritesGames",
  foreignKey: "favorites_id",
  through: "Favorites",
});
