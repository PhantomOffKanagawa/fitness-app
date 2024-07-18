import pickle
from User import User

# Save user to file
def save_user(user):
        filename = "user.user"
        with open(filename, 'wb') as file:
            pickle.dump(user, file)
        print(f"Saved User to {filename}")

# Load user from file
def load_user():
    try:
        with open("user.user", 'rb') as file:
            user_obj = pickle.load(file)
            user = user_obj
            print("Loaded User from user.user")
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