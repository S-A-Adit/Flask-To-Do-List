import React from "react";

export default function TodayTasks({ tasks = [], onToggle }) {
  // Get today's date (without time for comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter tasks due today
  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  if (todayTasks.length === 0) {
    return <p className="no-tasks">No tasks due today</p>;
  }

  return (
    <div className="tasks-container">
      <ul className="tasks-list">
        {todayTasks.map((task, index) => (
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
                onChange={() => onToggle(index)} // delegate to parent
              />
            </div>
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-footer">
                <span className="task-due">Today</span>
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
