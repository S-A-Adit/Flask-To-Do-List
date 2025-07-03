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

ReactDOM.createRoot(document.getElementById('edit-root')).render(
    <EditTodoForm initialTask={todo.task} index={todoIndex} />
);
