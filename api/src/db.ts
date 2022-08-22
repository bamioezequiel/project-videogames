import { Sequelize } from 'sequelize-typescript';
import config from './lib/config';

export const sequelize = new Sequelize({
  logging: false,
  native: false,
  dialect: 'postgres',
  database: config.dbName,
  password: config.dbPassword,
  username: config.dbUser,
  storage: ':memory:',
  models: [__dirname + '/models'],
});

export const {
  Cart, Favorites, User, Game
} = sequelize.models;