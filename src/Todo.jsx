import React, { useState, useEffect } from "react";

export default function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks on mount
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Normalize tasks to objects if they are strings (migration)
        const normalized = parsed.map(t => typeof t === "string" ? { text: t, completed: false } : t);
        setTasks(normalized);
      } catch (e) {
        setTasks([]);
      }
    }
  }, []);

  // Save tasks on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const newTask = { text: taskInput, completed: false };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleTask = (index) => {
    const updated = tasks.map((t, i) => 
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="container">
      <h2>My Tasks</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <ul id="tasksList">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span className="task-text">{task.text}</span>
            <div className="actions">
              <button 
                className="action-btn complete-btn" 
                onClick={() => toggleTask(index)}
                title={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed ? "↺" : "✓"}
              </button>
              <button 
                className="action-btn delete-btn" 
                onClick={() => deleteTask(index)}
                title="Delete task"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '20px', fontSize: '0.9rem' }}>
          No tasks left. Time to relax!
        </p>
      )}
    </div>
  );
}
