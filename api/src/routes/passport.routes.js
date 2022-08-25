import { Router } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
const passportLocal = passport.Strategy;
const router = Router();
// import myFunc from './../passport/passportConfig.js';
// myFunc(passport);

router.post("/login", (req, res, next) => {
  // console.log(req.body)
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", async (req, res) => {
  console.log(req.body.email);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        password: hashedPassword,
      },
    });
    if (!newUser[1]) {
      return res
        .status(400)
        .send(`Error, route <Post, PostRegister>: This user already exists`);
    }
    res.send(newUser[0]);
  } catch (error) {
    res.send(`Error, route <Post, PostRegister>: ${error}`);
  }
});
router.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

export default router;
