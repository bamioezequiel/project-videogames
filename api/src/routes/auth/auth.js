import express from "express";
import passport from "passport";
import { isAuthenticated } from "./midlewares.js";
import { userLogout, adminAccess, adminDelete, me, login } from "./utils.js";

const router = express.Router();
router.post("/login", login);
router.get("/login", isAuthenticated, (req, res) => {
  return res.send(req.user);
});
router.get("/logout", userLogout);
router.get("/me", me);
router.post("/promote/:id", adminAccess);
router.post("/demote/:id", adminDelete);

//Google

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    display: "popup",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/oauth",
    failureRedirect: "http://localhost:3000/oauth",
  })
);

/* //Github

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], display: "popup" })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000/oauth",
    failureRedirect: "http://localhost:3000/oauth",
  })
);

//Facebook

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"], display: "popup" })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/oauth",
    failureRedirect: "http://localhost:3000/oauth",
  })
); */

export default router;
