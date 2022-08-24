import { DataTypes } from "sequelize";
import { sequelize } from '../db.js';

export const Order = sequelize.define("order", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  total: { type: DataTypes.INTEGER, allowNull: false },

  status: { type: DataTypes.STRING, allowNull: false },
});
