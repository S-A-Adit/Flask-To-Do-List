import React from "react";

export default function ProjectTasks({ tasks = [], onToggle }) {
  // Group tasks by project
  const projects = tasks.reduce((acc, task) => {
    const projectName = task.project || "No Project";
    if (!acc[projectName]) acc[projectName] = [];
    acc[projectName].push(task);
    return acc;
  }, {});

  if (Object.keys(projects).length === 0) {
    return <p className="no-tasks">No projects to display</p>;
  }

  return (
    <div className="projects-container">
      {Object.entries(projects).map(([projectName, projectTasks]) => (
        <div key={projectName} className="project-section">
          <h2 className="project-header">{projectName}</h2>
          <ul className="tasks-list">
            {projectTasks.map((task, index) => (
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
                    onChange={() => onToggle(task)} // parent handles toggle
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
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
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
      ))}
    </div>
  );
}
