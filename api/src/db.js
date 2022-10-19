import { Sequelize } from "sequelize";
import config from "./lib/config.js";

export const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: config.dbName,
        dialect: "postgres",
        host: config.dbHost,
        port: 5432,
        username: config.dbUser,
        password: config.dbPassword,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
        host: config.dbHost,
        dialect: "postgres",
        logging: false,
        native: false,
      });
