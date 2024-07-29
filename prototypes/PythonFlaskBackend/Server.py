from flask import Flask, render_template, request, session
from flask_session import Session
import json
from FoodLibrary.NutritionLibrary import load_food_items, generate_solution
from FoodLibrary.UserLibrary import load_user

app = Flask(__name__, template_folder='templates')
app.secret_key = 'your_secret_key'  # Replace with your actual secret key
app.config['SESSION_TYPE'] = 'filesystem'  # Store sessions in the file system
Session(app)

@app.route("/edit_foods")
def edit_foods():
    return render_template("foodsJSON.html")

@app.route("/edit_user")
def edit_user():
    return render_template("userJSON.html")

@app.route("/generate")
def generate():
    return render_template("generate.html")

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/api/set_session_foods", methods=['POST'])
def set_foods():
    data = request.get_json()
    session['foods'] = data
    print(f"Received data: {data}")
    response = {"status": "success", "received_data": data}
    return json.dumps(response)

@app.route('/api/get_session_foods', methods=['GET'])
def get_foods():
    data = session.get('foods', {})
    response = {"status": "success", "session_data": data}
    return json.dumps(response)

@app.route("/api/set_session_user", methods=['POST'])
def set_user():
    data = request.get_json()
    session['user'] = data
    print(f"Received data: {data}")
    response = {"status": "success", "received_data": data}
    return json.dumps(response)

@app.route('/api/get_session_user', methods=['GET'])
def get_user():
    data = session.get('user', {})
    response = {"status": "success", "session_data": data}
    return json.dumps(response)

@app.route("/api/generate", methods=['GET', 'POST'])
def api_generate():
    food_data = session.get('foods', {})
    print(food_data)
    foods, groups, display_groups = load_food_items(food_data)
    user_data = session.get('user', {})
    print(user_data)
    user = load_user(user_data)
    data = generate_solution(foods, user, groups, display_groups)
    response = {"status": "success", "response_data": data}
    return response

if __name__ == '__main__':
    app.run(debug=True)