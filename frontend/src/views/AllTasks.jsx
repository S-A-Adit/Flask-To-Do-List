import React from "react";

export default function AllTasks({ tasks, onToggle }) {
  if (!tasks || tasks.length === 0) {
    return <p className="no-tasks">No tasks to display</p>;
  }

  return (
    <div className="tasks-container">
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item priority-${task.priority} ${
              task.completed ? "completed" : ""
            }`}
          >
            <div className="task-checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(index)} // let parent (App.jsx) handle toggle
              />
            </div>
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-footer">
                {task.dueDate && (
                  <span className="task-due">
                    {task.dueDate.toLocaleDateString()}
                  </span>
                )}
                {task.project && (
                  <span className="task-project">{task.project}</span>
                )}
                <span className="task-priority">
                  {"★".repeat(5 - task.priority)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
