import express from "express";
import { login, register, status } from "../controllers/auth.controllers.js";
import { isAdmin } from "../lib/midlewares/midlewares.js";

const router = express.Router();
// router.get("/access", login);
// router.patch("/rol", getUserRol);

export default router;
