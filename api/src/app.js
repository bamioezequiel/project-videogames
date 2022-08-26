import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import { User } from "./models/User.js";
import usersRoutes from "./routes/users.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import auth from "./routes/auth/auth.js";
const LocalStrategy = passportLocal.Strategy;
const app = express();

// --------------------------------------- PASSPORT SETUP GUARDAMOS EL ID DEL USER EN LA COOKIE(SERIALIZE) ---------------------
// Esto permite que la información almacenada en la sesión sea lo más pequeña posible ,ademas recibe un integred(con el cual la base de datos creo nuestro model)
passport.serializeUser((user, done) => done(null, user.id));

// DESERIALIZE la información del usuario va a quedar almacenada en req.user, usamos esa id para volver a consultar a la db quien es ese user(id)
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});
// ---> Una vez que deserializamos los datos podemos agarra el email, comparar los datos que nos llegan por body contra los de datos de la db ,si todo sale correcto nos mandara los datos de ese usuario y se logueara de lo contrario si el user no existe nos dara false como resultado.
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      console.log(email, password)
      User.findOne({ 
        where: { email: email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          if (!user.correctPassword(password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

// Middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/users", usersRoutes);
app.use("/games", gamesRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", auth);

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

app.use((err, _req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
