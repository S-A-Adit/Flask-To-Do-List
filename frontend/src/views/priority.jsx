import React from "react";

const PriorityTasks = ({ tasks, onToggle }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="no-tasks">No tasks to display</p>;
  }

  const priorityLabels = ["Critical", "High", "Medium", "Low"];

  // Sort by priority
  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);

  return (
    <div className="tasks-container">
      <ul className="tasks-list">
        {sortedTasks.map((task, index) => (
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
                onChange={() => onToggle(index)} // use parent handler
              />
            </div>
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <span className="priority-label">
                {priorityLabels[task.priority - 1] || "Unspecified"}
              </span>

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
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityTasks;
