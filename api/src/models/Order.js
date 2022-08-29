import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Order = sequelize.define("order", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date,
  },

  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },

  status: {
    type: DataTypes.ENUM("Cancelado", "Completado"),
    allowNull: false,
  },
});

// Un carrito tiene una orden
// Una orden tiene un carrito