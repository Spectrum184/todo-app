import SubtaskController from "../controllers/subtaskCtrl";
import express from "express";

const router = express.Router();

router.post("/user/task/subtask",SubtaskController.createSubtask)


export default router;