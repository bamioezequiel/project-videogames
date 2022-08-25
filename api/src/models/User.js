import { DataTypes } from "sequelize";
import { sequelize } from '../db.js';

export const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    // allowNull: true,
  },

  firstname: {
    type: DataTypes.STRING,
    // allowNull: true,
  },

  lastname: {
    type: DataTypes.STRING,
    // allowNull: true,
  },

  picture: {
    type: DataTypes.STRING,
    // allowNull: true,
  },

  date_of_birth: {
    type: DataTypes.STRING,
    // allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  phone: {
    type: DataTypes.STRING,
    // allowNull: true,
  },

  active: {
    type: DataTypes.BOOLEAN,
    // allowNull: true,
  },

  is_admin: {
    type: DataTypes.BOOLEAN,
    // allowNull: true,
  },
});
