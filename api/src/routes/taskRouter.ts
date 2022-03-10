import TaskController from "../controllers/taskCtrl";
import express from "express";

const router = express.Router();

router.post("/user/create_task", TaskController.createTask);

router.get("/user/id", TaskController.getTask);

export default router;