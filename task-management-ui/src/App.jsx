import { useState, useEffect } from "react";
import axios from "axios"; // We'll use axios to talk to our API
import "./index.css"; // Let's use the main index.css for some simple styling

// The base URL of our backend API
const API_URL = "http://localhost:3000/tasks";

function App() {
  // State for the list of tasks
  const [tasks, setTasks] = useState([]);
  // State for the new task title input field
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // useEffect runs when the component first loads.
  // It's the perfect place to fetch initial data.
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch all tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data); // Update the state with the fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to handle the form submission for creating a new task
  const handleCreateTask = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!newTaskTitle.trim()) return; // Don't create empty tasks

    try {
      const response = await axios.post(API_URL, { title: newTaskTitle });
      // Add the new task to our state to update the UI instantly
      setTasks([...tasks, response.data]);
      setNewTaskTitle(""); // Clear the input field
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Function to update the status of a task
  const handleUpdateTaskStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        status: newStatus,
      });
      // Update the specific task in our state to re-render the UI
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="container">
      <h1>Task Management</h1>

      {/* Form to create a new task */}
      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task title"
        />
        <button type="submit">Add Task</button>
      </form>

      {/* List of tasks */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item status-${task.status}`}>
            <p>{task.title}</p>
            <div className="task-status">
              <span>Status: {task.status}</span>
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
