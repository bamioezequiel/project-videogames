import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import usersRoutes from './routes/users.routes.js';
import gamesRoutes from './routes/games.routes.js';
import favoritesRoutes from './routes/favorites.routes.js';
import cartRoutes from './routes/cart.routes.js';

const app = express();

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

app.use((err, _req, res, next ) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
