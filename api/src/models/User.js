import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import crypto from "crypto";

export const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      // allowNull: true,
      unique: true,
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: "User",
      validate: {
        isString(value) {
          if (value && typeof value !== "string")
            throw new Error("El rol debe ser valido");
        },
      },
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isString(value) {
          if (typeof value !== 'string')
            throw new Error('Ingresa un nombre valido');
        },
      },
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
      unique: true,
				validate: {
					isEmail: true,
				},
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return () => this.getDataValue('password');
      }
    },

    phone: {
      type: DataTypes.STRING,
      // allowNull: true,
    },

    active: {
      type: DataTypes.BOOLEAN,
      // allowNull: true,
    },

  },
  {
    validate: {
      OAuthOrPassword() {
        if (
          !this.password
        ) {
          throw new Error("No has iniciado sesión");
        }
      },
    },
  }
);

// --------------------------HASH y SALT PASSWORD------------------------
// Genera la una salt	random
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};
// crea y hashea la password y la pasa a texto plano
User.encryptPassword = function (plainText, salt) {
  return crypto.createHash("sha1").update(plainText).update(salt).digest("hex");
};
// En esta funcion se va a comenzar a crear y hashear la contraseña
const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};
// antes de que el usuario se guarde en la base de datos  va a usar las funciones anteriores para poder crear la salt y hashear la password
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
// Creamos un prototype para poder comparar la contraseña ingresada con la contraseñan que se ingreso(login)
User.prototype.correctPassword = function (enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password();
};
