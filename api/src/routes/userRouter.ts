import UserController from "../controllers/userCtrl";
import express from "express";

const router = express.Router();

router.post("/user", UserController.createUser);

router.post("/user/login", UserController.UserLogin);

export default router;