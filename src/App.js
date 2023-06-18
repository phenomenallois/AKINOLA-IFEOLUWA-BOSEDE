import React, { useState } from 'react';


const TaskItem = ({ task, deleteTask, markTaskCompleted }) => {
  const handleCheckboxChange = () => {
    markTaskCompleted(task.id);
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

const TaskList = ({ tasks, deleteTask, markTaskCompleted, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    }
  });

  return (
    <div>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            markTaskCompleted={markTaskCompleted}
          />
        ))}
      </ul>
    </div>
  );
};

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskTitle.trim() !== '') {
      addTask(taskTitle);
      setTaskTitle('');
    }
  };

  const handleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={taskTitle}
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (taskTitle) => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const markTaskCompleted = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>TASK MANAGER</h1>
      <TaskForm addTask={addTask} />
      <div>
        <span>Filter: </span>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        markTaskCompleted={markTaskCompleted}
        filter={filter}
      />
    </div>
  );
};

export default App;
