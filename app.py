from flask import Flask, send_from_directory, jsonify
import os

# Initialize Flask app
app = Flask(__name__, static_folder='./frontend/build')

# API Routes
@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
