import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { validatorSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post(
  "/tasks",
  authRequired,
  validatorSchema(createTaskSchema),
  createTask
);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put(
  "/tasks/:id",
  authRequired,
  validatorSchema(updateTaskSchema),
  updateTask
);

export default router;
