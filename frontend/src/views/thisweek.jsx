import React from "react";

export default function ThisWeekTasks({ tasks = [], onToggle }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    const diffInDays = (taskDate - today) / (1000 * 60 * 60 * 24);

    // Task is due within next 7 days, but not today
    return diffInDays > 0 && diffInDays <= 7;
  });

  if (weekTasks.length === 0) {
    return <p className="no-tasks">No tasks due this week</p>;
  }

  return (
    <div className="tasks-container">
      <ul className="tasks-list">
        {weekTasks.map((task, index) => (
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
                onChange={() => onToggle(task)}
              />
            </div>
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-footer">
                <span className="task-due">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </span>
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
