import SubtaskController from "../controllers/subtaskCtrl";
import express from "express";

const router = express.Router();

router.post("/user/task/subtask",SubtaskController.createSubtask);

router.get('/user/task/subtask/:id', SubtaskController.getSubtask);

router.patch('/user/task/subtask/:id', SubtaskController.updateSubtask);

router.delete('/user/task/subtask/:id', SubtaskController.deleteSubtask);

export default router;