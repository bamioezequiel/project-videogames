import { Router } from "express";
import {
  getUsers,
  getUserByID,
  postUser,
  deleteUser,
  restoreUser,
  patchAdminUser,
  patchStatusUser,
  updateUser,
} from "../controllers/users.controllers.js";
const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);
router.post("/", postUser);
router.delete("/delete/:id", deleteUser);
router.put("/update", updateUser);
router.patch("/restore/:id", restoreUser);
router.patch("/status/:id", patchStatusUser);
router.patch("/admin/:id", patchAdminUser);

export default router;
