import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import crypto from "crypto";

export const User = sequelize.define(
  "user",
  {
    /* id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }, */

    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isString(value) {
          if (typeof value !== "string") throw new Error("Invalid name");
        },
      },
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isString(value) {
          if (typeof value !== "string") throw new Error("Invalid lastname");
        },
      },
    },

    picture: {
      type: DataTypes.STRING,
      defaultValue: "https://imgur.com/EyEFL9w.png",
      validate: {
        isString(value) {
          if (typeof value !== "string") throw new Error("Invalid lastname");
        },
      },
    },

    date_of_birth: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    rol: {
      type: DataTypes.ENUM("Owner", "Admin", "User"),
      defaultValue: "User",
      validate: {
        isString(value) {
          if (value && typeof value !== "string")
            throw new Error("El rol debe ser valido");
        },
      },
    },
  },
  {
    paranoid: true,
    deletedAt: "deleteAt",
  }
);
