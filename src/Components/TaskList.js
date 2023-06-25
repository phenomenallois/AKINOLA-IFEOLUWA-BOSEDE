import React, { useState } from 'react';
import TaskItem from './Components/TaskItem';
import "./TaskList.css";
const TaskList = ({ tasks, deleteTask }) => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true; // Show all tasks
    } else if (filter === 'completed') {
      return task.completed; // Show only completed tasks
    } else if (filter === 'incomplete') {
      return !task.completed; // Show only incomplete tasks
    }
  });

  return (
    <div>
      <div>
        <span>Filter: </span>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
