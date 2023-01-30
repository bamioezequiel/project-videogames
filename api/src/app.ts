import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cartRoutes from './routes/cart.routes';
import gamesRoutes from './routes/games.routes';
import categoriesRoutes from './routes/categories.routes';
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', ''],
    methods: ['POST', 'GET'],
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use("/games", gamesRoutes);
app.use("/cart", cartRoutes);
app.use("/categories", categoriesRoutes);

export default app;