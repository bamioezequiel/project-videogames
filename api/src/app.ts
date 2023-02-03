import express from "express";
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
    allowedHeaders: '*',
    methods: ["POST", "GET", "DELETE"],
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

export default app;
