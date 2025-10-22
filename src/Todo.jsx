import React, { useState, useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // This runs only once when the component loads
  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks from localStorage
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }

  // Add a new task
  function addTask() {
    if (task.trim() === "") {
      alert("Enter a task");
      return;
    }

    const updatedTasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setTask(""); // clear input
  }

  // Delete a task
  function deleteTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>To-Do App</h2>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasks.map((t, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            {t}{" "}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
