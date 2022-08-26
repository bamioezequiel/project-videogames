import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Order = sequelize.define("order", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  total: { type: DataTypes.INTEGER, allowNull: false },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  }
});
