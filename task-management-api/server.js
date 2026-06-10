import express from "express";
import cors from "cors";
import taskRoutes from "./src/routes/task.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Management API is alive!");
});
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
