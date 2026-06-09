import db from "../config/db.js";

export const createTask = async (title) => {
  const query = "INSERT INTO tasks (title) VALUES ($1) RETURNING *";
  const { rows } = await db.query(query, [title]);
  return rows[0];
};

export const getAllTasks = async () => {
  const query = "SELECT * FROM tasks ORDER BY created_at DESC";
  const { rows } = await db.query(query);
  return rows;
};

export const updateTaskStatus = async (id, status) => {
  const query = "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *";
  const { rows } = await db.query(query, [status, id]);
  return rows[0];
};

export const findTaskById = async (id) => {
  const query = "SELECT * FROM tasks WHERE id = $1";
  const { rows } = await db.query(query, [id]);
  return rows[0];
};
