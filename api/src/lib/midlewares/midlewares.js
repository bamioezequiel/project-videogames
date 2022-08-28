export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(false);
  }
};

export function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.rol === "Admin") {
    next();
  } else {
    return res
      .status(401)
      .send("No tienes permitido acceder o debes iniciar session");
  }
}

export function isUserLogin(req, res, next) {
  if (req.isAuthenticated() && req.user.rol === "User") {
    next();
  } else {
    return res.status(401).send("Para acceder deber Iniciar session");
  }
}
