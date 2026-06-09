import { Router } from "express";
import * as controller from "../controllers/task.controller.js";

const router = Router();

router.post("/", controller.createTask);
router.get("/", controller.getAllTasks);
router.patch("/:id", controller.updateTaskStatus);

export default router;
