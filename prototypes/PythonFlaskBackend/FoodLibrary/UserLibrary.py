# import pickle
import json
from FoodLibrary.User import User

# Save user to file
def save_user(user):
        filename = "user.json"
        with open(filename, 'wb') as file:
            json.dump(user, file)
        print(f"Saved User to {filename}")

# Load user from file
def load_user():
    try:
        with open("data/user.json", 'rb') as user_file:
            user_dict = json.load(user_file)
            user = User([user_dict.protein_min, user_dict.protein_max], [user_dict.carb_min, user_dict.carb_max], [user_dict.fat_min, user_dict.fat_max], [user_dict.calories_min, user_dict.calories_max])
            print("Loaded User from user.json")
    except (FileNotFoundError):
        print("No user found initializing defaults.")
        return initialize_user()
    return user

def initialize_user():
    # Define user
    protein = (175, 200)
    carb = (200, 350)
    fat = (45, 70)
    calories = (2200, 2700)
    return User(protein, carb, fat, calories)