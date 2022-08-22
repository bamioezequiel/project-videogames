import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import error from "./interfaces/error.interfaces";

// const recipes = require('./routes/recipes.js');
// const diets = require('./routes/diets.js');

const server: Application = express();

// Middlewares
server.use(express.urlencoded({ extended: true, limit: "50mb" })); //middleware
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// server.use('/recipes', recipes);
// server.use('/diets', diets);

server.use((req, res, next) => {
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
server.use((err: error, _req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
