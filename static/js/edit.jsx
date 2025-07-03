function EditTodoForm({ initialTask, index }) {
    const [task, setTask] = React.useState(initialTask);

    return (
        <div className="container">
            <h1>Edit Todo</h1>
            <form method="POST" action={`/edit/${index}`}>
                <input
                    type="text"
                    name="todo"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

// Get data from the root element's dataset
const rootElement = document.getElementById('edit-root');
const todoData = JSON.parse(rootElement.dataset.todo);
const todoIndex = JSON.parse(rootElement.dataset.index);

ReactDOM.createRoot(rootElement).render(
    <EditTodoForm 
        initialTask={todoData.task} 
        index={todoIndex} 
    />
);