import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import gamesRoutes from './routes/games.routes';
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://typescript-payments-be.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use("/games", gamesRoutes);

export default app;