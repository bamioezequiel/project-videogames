import { status } from "../../controllers/auth.controllers.js";

export const isAuthenticated = (req, res, next) => {
  if (status(req, res)) {
    next();
  } else {
    res.send(false);
  }
};

export function isAdmin(req, res, next) {
  if (isAuthenticated() && req.user.rol === "Admin" || req.user.rol === "Owner") {
    next();
  } else {
    return res
      .status(401)
      .send("No tienes permitido acceder o debes iniciar session");
  }
}

export function isOwner(req, res, next) {
  if (isAuthenticated() && req.user.rol === "Owner") {
    next();
  } else {
    return res
      .status(401)
      .send("No tienes permitido acceder o debes iniciar session");
  }
}

export function isUserLogin(req, res, next) {
  if (isAuthenticated() && req.user.rol === "User") {
    next();
  } else {
    return res.status(401).send("Para acceder deber Iniciar session");
  }
}
