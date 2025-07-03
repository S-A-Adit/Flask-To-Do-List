const { useState } = React;

function TodoApp({ initialTodos }) {
    const [todos, setTodos] = useState(initialTodos);

    const handleCheckboxToggle = (index) => {
        window.location.href = `/check/${index}`;
    };

    const handleDelete = (index) => {
        if (confirm("Are you sure you want to delete this item?")) {
            window.location.href = `/delete/${index}`;
        }
    };

    const handleEdit = (index) => {
        window.location.href = `/edit/${index}`;
    };

    return (
        <div className="container">
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li className="todo-item" key={index}>
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleCheckboxToggle(index)}
                        />
                        <span className={`todo-text ${todo.done ? 'done' : ''}`}>
                            {todo.task}
                        </span>
                        <div className="actions">
                            <a href="#" onClick={() => handleEdit(index)}>Edit</a>
                            <a href="#" onClick={() => handleDelete(index)}>Delete</a>
                        </div>
                    </li>
                ))}
            </ul>
            <form method="POST" action="/add">
                <input type="text" name="todo" placeholder="Add a new task..." required />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <TodoApp initialTodos={todos} />
);
