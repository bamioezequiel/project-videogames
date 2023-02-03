import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usersRoutes from './routes/users.routes';
import cartRoutes from './routes/cart.routes';
import gamesRoutes from './routes/games.routes';
import categoriesRoutes from './routes/categories.routes';
import authRoutes from './routes/auth.routes';
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', '*'],
    methods: ['POST', 'GET', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use("/auth", authRoutes);
app.use("/games", gamesRoutes);
app.use("/cart", cartRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);

export default app;