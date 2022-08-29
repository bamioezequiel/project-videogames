import { User } from "./../models/User.js";
import passport from "passport";

export const login = (req, res, next) => {
  // console.log(req.user, 'SOY REQ.USER POST');
  passport.authenticate("local", async (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.send(user); }
    req.login(user, async (err) => {
      if (err) { return next(err); }
      
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

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send("User not logged in");
  }
};

export const logout = (req, res) => {
  req.logout( (err) => {
    if(err) return res.status(404).send(err); 
    return res.send("User logged out successfully");
  } );
};

export const adminAccess = (req, res) => {
  const { id } = req.params;
  if (req.isAuthenticated() && req.user.rol === "Admin") {
    User.findByPk(id).then((user) => {
      if (!user) return res.status(404).send("User not found");
      else if (user.rol === "User") user.rol = "Admin";
      user.save();
      return res
        .status(200)
        .send(`${user.name} is now Admin.  `);
    });
  } else {
    return res.status(401).send("You are not logged in or you are not an admin");
  }
};

export const adminDelete = (req, res) => {
  const { id } = req.params;

  if (req.isAuthenticated() && req.user.rol === "Admin") {
    User.findByPk(id).then((user) => {
      if (!user) return res.status(404).send("User not found");
      else if (user.rol === "Admin") user.rol = "User";
      user.save();
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
