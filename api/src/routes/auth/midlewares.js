// //CON ESTA FUNCION CONFIRMAREMOS SI EL USER ESTA autenticado
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(false);
  }
};
// Verifica si el usuario es admin para poder acceder a los roles de admin
export function isAdmin(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated() && req.user.rol === "Admin") {
    next();
  } else {
    return res
      .status(401)
      .send("No tienes permitido acceder o debes iniciar session");
  }
}
// //  Verifica si el usuario es User y si se logueo
export function isUserLogin(req, res, next) {
  if (req.isAuthenticated() && req.user.rol === "User") {
    next();
  } else {
    return res.status(401).send("Para acceder deber Iniciar session");
  }
}
