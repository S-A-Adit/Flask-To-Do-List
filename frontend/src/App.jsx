import React, { useState } from "react";
import AllTasks from "./views/AllTasks.jsx";
import TodayTasks from "./views/today.jsx";
import ThisWeekTasks from "./views/thisweek.jsx";
import PriorityTasks from "./views/priority.jsx";
import ProjectTasks from "./views/project.jsx";
import Task from "./models/task.js";

const App = () => {
  const [tasks, setTasks] = useState([
    new Task("Complete project", {
      description: "Finish all remaining tasks",
      dueDate: new Date(),
      priority: 1,
      project: "Work",
    }),
    new Task("Buy groceries", {
      description: "Milk, eggs, bread",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      priority: 3,
      project: "Personal",
    }),
    new Task("Call mom", {
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      priority: 2,
    }),
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: 4,
    project: "",
  });

  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].toggleCompletion();
    setTasks(updatedTasks);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = new Task(formData.title, {
      description: formData.description,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      priority: formData.priority,
      project: formData.project,
    });
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
    setFormData({ title: "", description: "", dueDate: "", priority: 4, project: "" });
  };

  const renderActiveView = () => {
    const props = { tasks, onToggle: handleToggleTask };
    switch (activeTab) {
      case "today":
        return <TodayTasks {...props} />;
      case "week":
        return <ThisWeekTasks {...props} />;
      case "priority":
        return <PriorityTasks {...props} />;
      case "projects":
        return <ProjectTasks {...props} />;
      case "all":
      default:
        return <AllTasks {...props} />;
    }
  };
  const tabs = [
    { id: "all", label: "All Tasks", icon: "fas fa-tasks" },
    { id: "today", label: "Today", icon: "fas fa-calendar-day" },
    { id: "week", label: "This Week", icon: "fas fa-calendar-week" },
    { id: "priority", label: "Priority", icon: "fas fa-exclamation" },
    { id: "projects", label: "Projects", icon: "fas fa-folder" },
  ]

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>TO DO LIST</h2>
          <button className="add-task-btn" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus"></i> Add Task
          </button>
        </div>
        <div className="sidebar-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={activeTab === tab.id ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab.id)}
              data-tab={tab.id}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderActiveView()}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>Title*</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                  <option value={4}>Very Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Project</label>
                <input type="text" name="project" value={formData.project} onChange={handleChange} />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Add Task</button>
                <button type="button" onClick={() => setShowModal(false)} className="close-modal"></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

