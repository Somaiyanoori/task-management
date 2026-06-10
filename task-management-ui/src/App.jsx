/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Could not fetch tasks. The server may be down.");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const response = await axios.post(API_URL, { title: newTaskTitle });
      setTasks([...tasks, response.data]);
      setNewTaskTitle("");
      setError(null);
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    }
  };

  const handleUpdateTaskStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        status: newStatus,
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
      setError(null);
    } catch (error) {
      console.error("Error updating task status:", error);
      setError("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Task Management</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task title"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item status-${task.status}`}>
            <p>{task.title}</p>
            <div className="task-status">
              <div className="status-buttons">
                {task.status !== "to-do" && (
                  <button
                    onClick={() => handleUpdateTaskStatus(task.id, "to-do")}
                  >
                    To-Do
                  </button>
                )}
                {task.status !== "in-progress" && (
                  <button
                    onClick={() =>
                      handleUpdateTaskStatus(task.id, "in-progress")
                    }
                  >
                    In Progress
                  </button>
                )}
                {task.status !== "done" && (
                  <button
                    onClick={() => handleUpdateTaskStatus(task.id, "done")}
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
