// routes/task.routes.js
import express from "express";
import auth from "../Middleware/auth.middleware.js";
import {  createTask,
  getTasks,
  updateTask,
  deleteTask,
  markCompleted } from "../Controllers/task.controllers.js";

const router = express.Router();
// router.get("/", auth, getTasks);
// router.post("/", auth, createTask);

router.post("/",auth, createTask);
router.get("/",auth, getTasks);
router.put("/:id",auth, updateTask);
router.delete("/:id",auth, deleteTask);
router.patch("/complete/:id",auth, markCompleted);

export default router;


