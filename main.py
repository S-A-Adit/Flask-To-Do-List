from flask import Flask, redirect, url_for, request, render_template
from dataclasses import dataclass
from typing import List

app = Flask(__name__, template_folder="templates")


@dataclass
class TodoItem:
    task: str
    done: bool = False


# In-memory list to store todos
todo_items: List[TodoItem] = []


@app.route('/')
def index():
    """Render the main page with the current list of to-do items."""
    return render_template('index.html', todos=todo_items)


@app.route('/add', methods=['POST'])
def add():
    """Add a new task to the to-do list."""
    task = request.form.get('todo')
    if task:
        todo_items.append(TodoItem(task=task))
    return redirect(url_for('index'))


@app.route('/edit/<int:index>', methods=['GET', 'POST'])
def edit(index: int):
    """Edit an existing to-do item."""
    if 0 <= index < len(todo_items):
        todo = todo_items[index]

        if request.method == 'POST':
            updated_task = request.form.get('todo')
            if updated_task:
                todo.task = updated_task
            return redirect(url_for('index'))

        return render_template('edit.html', todo=todo, index=index)
    return redirect(url_for('index'))


@app.route('/check/<int:index>')
def check(index: int):
    """Toggle the completion status of a task."""
    if 0 <= index < len(todo_items):
        todo_items[index].done = not todo_items[index].done
    return redirect(url_for('index'))


@app.route('/delete/<int:index>')
def delete(index: int):
    """Delete a task from the to-do list."""
    if 0 <= index < len(todo_items):
        del todo_items[index]
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
