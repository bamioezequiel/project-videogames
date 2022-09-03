import express from "express";
import { giveAdmin, login, register, removeAdmin, status, validateUser } from "../controllers/auth.controllers.js";
import { isOwner } from "../lib/midlewares/midlewares.js";

const router = express.Router();
router.post("/status", status);
router.post("/login", login);
router.post("/register", register);
router.patch("/admin/add/:id", giveAdmin);
router.patch("/admin/remove/:id", removeAdmin);
router.get("/validate", validateUser);

export default router;
