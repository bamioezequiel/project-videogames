import { Router } from "express";
import { changeRole, getAllUsers, getUserById, getUserByToken, putUser } from "../controllers/user.controllers";
import { checkAuth, checkRoleAuth } from "../middlewares/auth.middlewares";

const router = Router();

/* router.get('/', checkAuth, checkRoleAuth(['User']), getUser); */
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/token", getUserByToken);
router.post("/changeRole", checkAuth, checkRoleAuth(["Owner"]), changeRole);
router.put("/:id", putUser);

export default router;