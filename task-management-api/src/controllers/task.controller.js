import * as model from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const newTask = await model.createTask(title.trim());
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error in createTask controller:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await model.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks controller:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["to-do", "in-progress", "done"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }
    const updatedTask = await model.updateTaskStatus(id, status);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in updateTaskStatus controller:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};
