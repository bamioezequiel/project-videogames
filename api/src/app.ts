import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import morgan from "morgan";
import usersRoutes from "./routes/users.routes";
import cartRoutes from "./routes/cart.routes";
import gamesRoutes from "./routes/games.routes";
import paymentRoutes from "./routes/payment.routes";
import categoriesRoutes from "./routes/categories.routes";
import authRoutes from "./routes/auth.routes";
const app = express();

dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://project-videogames-aztyaetqw-ezequielbamio.vercel.app/",
      "https://project-videogames-rosy.vercel.app",
    ],
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes);
app.use("/games", gamesRoutes);
app.use("/cart", cartRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);
app.use("/payment", paymentRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


export default app;
