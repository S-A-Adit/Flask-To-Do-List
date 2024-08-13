# Flask-To-Do-List
A simple and user-friendly Todo List application built with Flask. This project demonstrates fundamental web development skills using Python, Flask, and HTML. It allows users to add, edit, mark as complete, and delete tasks in a dynamic web interface.
Features
-Add Tasks: Users can add new tasks to the Todo List.
-Edit Tasks: Users can edit existing tasks to update their content.
-Mark as Complete: Users can toggle the completion status of tasks.
-Delete Tasks: Users can delete tasks from the list.
-Responsive Design: The interface is responsive and adjusts to different screen sizes.

Installation:
1.git clone https://github.com/yourusername/flask-todo-list.git
2.cd flask-todo-list
3.python3 -m venv venv
4.Activate the virtual environment:
---On Windows:
         venv\Scripts\activate
---On macOS/Linux:
         source venv/bin/activate
5.Install the required packages:
---pip install -r requirements.txt
6.Run the Flask application:
---flask run

Project Structure
flask-todo-list/
│
├── templates/
│   ├── index.html        # The main page displaying the Todo List
│   └── edit.html         # The page for editing a task
│
├── app.py                # The main Flask application
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation


Usage
Add a Task: Type your task in the input box and click "Add".
Edit a Task: Click the "Edit" link next to the task you want to modify, update the task, and click "Save".
Mark as Complete: Check the checkbox next to the task to mark it as complete. The task will be crossed out.
Delete a Task: Click the "Delete" link next to the task to remove it from the list.


Contributing
Contributions are welcome! Feel free to submit a Pull Request.

License
This project is licensed under the MIT License.



