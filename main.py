from flask import Flask, redirect, url_for, request, render_template

# Initialize the Flask application
app = Flask(__name__, template_folder="templates")

# A list to store all the to-do items
todos = []


# Route for the home page, which displays the to-do list
@app.route('/')
def index():
    """Render the main page with the current list of todos."""
    return render_template('index.html', todos=todos)


# Route to handle adding a new to-do item
@app.route('/add', methods=['POST'])
def add():
    """Add a new task to the todo list."""
    todo_task = request.form.get('todo')
    if todo_task:
        # Append the new to-do item to the list with a 'done' status of False
        todos.append({'task': todo_task, 'done': False})
    return redirect(url_for('index'))


# Route to handle editing an existing to-do item
@app.route('/edit/<int:index>', methods=['POST', 'GET'])
def edit(index):
    """Edit an existing task in the todo list."""
    todo = todos[index]

    if request.method == 'POST':
        # Update the task with the new value from the form submission
        updated_task = request.form.get('todo')
        if updated_task:
            todo['task'] = updated_task
        return redirect(url_for('index'))

    # Render the edit.html template and pass the current to-do item and its index to it
    return render_template('edit.html', todo=todo, index=index)


# Route to toggle the 'done' status of a to-do item
@app.route('/check/<int:index>')
def check(index):
    """Toggle the completion status of a task."""
    todos[index]['done'] = not todos[index]['done']
    return redirect(url_for('index'))


# Route to handle deleting a to-do item
@app.route('/delete/<int:index>')
def delete(index):
    """Delete a task from the todo list."""
    if 0 <= index < len(todos):
        del todos[index]
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
