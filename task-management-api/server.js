import express from "express";
import cors from "cors";
import taskRoutes from "./src/routes/task.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- ROUTES
app.get("/", (req, res) => {
  res.send("Task Management API (ESM Version) is running!");
});

app.use("/tasks", taskRoutes);

// --- ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
