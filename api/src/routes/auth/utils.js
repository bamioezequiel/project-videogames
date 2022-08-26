import { User } from "./../../models/User.js";
import passport from "passport";

// user login
export const login = (req, res, next) => {
  // console.log(req.user, 'SOY REQ.USER POST');
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(user);
    }
    req.login(user, async (err) => {
      if (err) {
        return next(err);
      }
      const userDB = await User.findOne({
        where: {
          email: req.user.email,
        },
        attributes: {
          exclude: ["password"],
        },
        include: "favorites"
      });
      return res.send(userDB);
    });
  })(req, res, next);
};
// // Verifica si el usuario esta logeado
export const me = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send("User not logged in");
  }
};
// // Verifica si el user esta logeado --> lo desloguea , si no avisamos que no se logueo
export const userLogout = (req, res) => {
  req.logout();
  return res.status(200).send("User logged out successfully");
};
// Verifica si el user esta logueado y le otorga accesos de admin
export const adminAccess = (req, res) => {
  const { id } = req.params;
  console.log(req.user, "soy el console.log de req");
  // Si el usuario no esta autenticado retornamos un status (401) y avisamos que no esta logueado.
  /* if (!req.isAuthenticated()) return res.status(401).send("No estás logueado"); */
  // Si el rol del usuario es diferente de Admin , retornamos un 401 y avisamos que no es admin
  if (req.isAuthenticated() && req.user.rol === "Admin") {
    // Si no entra en ninguno entonces va a buscar el id del user en la base de datos y pregunta:
    User.findByPk(id).then((user) => {
      // si el usuario no existe status 404
      if (!user) return res.status(404).send("User not found");
      // si el usuario existe y su rol es Usere ---> cambiara a Admin
      else if (user.rol === "User") user.rol = "Admin";
      // guarda los datos cambiados en db
      user.save();
      // devuelve mensaje
      return res
        .status(200)
        .send(`${user.name} is now Admin.  `);
    });
  } else {
    return res.status(401).send("You are not logged in or you are not an admin");
  }
};
// verifica si el user esta logueado y le elimina el acceso a admin
export const adminDelete = (req, res) => {
  const { id } = req.params;

  // Si el rol del usuario es igual a Usere , retornamos un 401 y avisamos que ya es User
  if (req.isAuthenticated() && req.user.rol === "Admin") {
    // Si no entra en ninguno entonces va a buscar el id del user en la base de datos y pregunta:
    User.findByPk(id).then((user) => {
      // si el usuario no existe status 404
      if (!user) return res.status(404).send("User not found");
      // si el usuario existe y su rol es Admin ---> cambiara a User
      else if (user.rol === "Admin") user.rol = "User";
      // guarda los datos cambiados en db
      user.save();
      // devuelve mensaje
      return res
        .status(200)
        .send(
          `${user.name} is no longer admin `
        );
    });
  } else {
    return res.status(401).send("You are not logged in or you are not an admin");
  }
};
