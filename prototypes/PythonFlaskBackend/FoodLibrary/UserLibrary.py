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
# def load_user():
#     try:
#         with open("data/user.json", 'rb') as user_file:
#             user_dict = json.load(user_file)
#             user = User([user_dict.protein_min, user_dict.protein_max], [user_dict.carb_min, user_dict.carb_max], [user_dict.fat_min, user_dict.fat_max], [user_dict.calories_min, user_dict.calories_max])
#             print("Loaded User from user.json")
#     except (FileNotFoundError):
#         print("No user found initializing defaults.")
#         return initialize_user()
#     return user


def load_user(user_json):
    try:
        print(user_json)
        if user_json != {}:
            user_dict = user_json
            user = User([user_dict["min_protein"] - user_dict["current_protein"], user_dict["max_protein"] - user_dict["current_protein"]], [user_dict["min_carbs"] - user_dict["current_carbs"], user_dict["max_carbs"] - user_dict["current_carbs"]], [user_dict["min_fat"] - user_dict["current_fat"], user_dict["max_fat"] - user_dict["current_fat"]], [user_dict["min_calories"] - user_dict["current_calories"], user_dict["max_calories"] - user_dict["current_calories"]])
            print("Loaded User from user.json")
        else:
            print("No user provided. Initializing defaults")
            return initialize_user()
    except Exception as e:
        print("Issue loading user")
        print(e)
        return initialize_user()
    return user

def initialize_user():
    # Define user
    protein = (175, 200)
    carb = (200, 350)
    fat = (45, 70)
    calories = (2200, 2700)
    return User(protein, carb, fat, calories)