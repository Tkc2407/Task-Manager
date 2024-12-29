import express from "express";
import Task from "../../lib/models/Task";
import authMiddleware from "../../lib/middleware/authMiddleware";
import { Request, Response } from "express";

const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Tasks with Filters
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { priority, status } = req.query;
    const filters: any = { userId: req.user.userId };
    if (priority) filters.priority = priority;
    if (status) filters.status = status;

    const tasks = await Task.find(filters).sort({ startTime: 1, endTime: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Task
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
