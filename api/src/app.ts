import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import error from "./interfaces/error.interfaces";

import usersRoutes from './routes/users.routes';
import gamesRoutes from './routes/games.routes';
import favoritesRoutes from './routes/favorites.routes';
import cartRoutes from './routes/cart.routes';

const app: Application = express();

// Middlewares
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/users', usersRoutes);
app.use('/games', gamesRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/cart', cartRoutes);

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Error catching endware.
app.use((err: error, _req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
