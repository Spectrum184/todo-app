import TaskController from "../controllers/taskCtrl";
import express from "express";

const router = express.Router();

router.post("/user/create_task", TaskController.createTask);

router.get("/user/task/:id", TaskController.getTask);

router.patch("/user/task/:id", TaskController.updateTask);

router.delete("/user/task/:id", TaskController.deleteTask);

export default router;