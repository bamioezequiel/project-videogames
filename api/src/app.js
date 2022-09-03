import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportJwt from "passport-jwt";
import { User } from "./models/User.js";
import usersRoutes from "./routes/users.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import auth from "./routes/auth.routes.js";
import tagsRoutes from "./routes/tags.routes.js";
import platformsRoutes from "./routes/platforms.routes.js";
import genresRoutes from "./routes/genres.routes.js";
import dotenv from "dotenv";
dotenv.config();

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const app = express();

passport.use(
  "jwt-auth",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    },
    async (jwtPayload, done) => {
      try {
        var findUser = await User.findOne({
          where: { id: jwtPayload.id },
        });
        done(null, findUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "jwt-admin",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    },
    async (jwtPayload, done) => {
      try {
        if (jwtPayload.rol === "Admin") {
          let adminCheck = await User.findOne({
            where: {
              id: jwtPayload.id,
              rol: "Admin",
            },
          });
          done(null, adminCheck);
        } else done(null, false, { message: "User is not an admin!" });
      } catch (error) {
        done(error);
      }
    }
  )
);

// Middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/games", gamesRoutes);
app.use("/tags", tagsRoutes);
app.use("/genres", genresRoutes);
app.use("/platforms", platformsRoutes);
app.use("/users", usersRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", auth);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use((err, _req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
