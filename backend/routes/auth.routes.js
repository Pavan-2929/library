import express from "express";
import { getUsers, login, logout, register } from "../controllers/auth.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/users/get", getUsers)

export default router;
