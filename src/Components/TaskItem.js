import React from 'react';
import "./TaskItem.css";
const TaskItem = ({ task, deleteTask }) => {
  const handleCheckboxChange = () => {
    // Toggle the completed property of the task object
    task.completed = !task.completed;
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
      />
      <span>{task.title}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
