import NutritionLibrary
import UserLibrary
from Food import Food
from User import User

import re

# Function for getting inputs
def get_input(question):
    # Ask for an input until it is valid
    while(True):
        try:
            value = float(input(question))

            # If negative, retry
            if (value < 0):
                print("Negative value is not allowed.")
                continue

        # If the value is invalid, retry
        except ValueError:
            print("The value you entered is invalid. Please input a numerical value only")
        
        # If value is valid, return value
        else:
            break
    return value

# Define the menu options
def menu():
    print("Nutrition Menu\n——————")
    print("1. Add a Food")
    print("2. Remove a Food")
    print("3. List Foods")
    print("4. Generate Meal Plan")
    print("5. Edit User Needs")
    print("6. Quit")

    
def add_food():
    global foods
    bad_characters = r'[<>:/\\|?*\"]'
    name = input("What is the name of the food item? ")
    while (name == "" or name.lower() in (food.name.lower() for food in foods) or re.search(bad_characters, name) is not None):
        print("Name was invalid or already in foods.")
        name = input("What is the name of the food item? ")
    protein = get_input(f"How many grams of protein in {name}? ")
    carbs = get_input(f"How many grams of carbs in {name}? ")
    fats = get_input(f"How many grams of fats in {name}? ")
    calories = get_input(f"How many calories in {name}? ")
    min_serving = int(get_input(f"What is the minimum daily servings of {name}? "))
    max_serving = int(get_input(f"What is the maximum daily servings of {name}? "))
    while (max_serving < min_serving):
        print(f"The maximum cannot be greater than the minimum of {min_serving}")
        max_serving = get_input(f"What is the maximum daily servings of {name}? ")

    foods.append(Food(name, protein, carbs, fats, calories, min_serving, max_serving))

    
def remove_food():
    global foods
    name = input("What is the name of the food item you want to delete? ")
    while (name == "" or name.lower() in (food.name.lower() for food in foods)):
        print("Name was invalid or not in foods.")
        name = input("What is the name of the food item you want to delete? ")

    matches = [food for food in foods if food.name.lower() == name.lower()]
    if (len(matches) > 0):
        print("Match was found and deleted")
        foods.remove(matches[0])
    else:
        print("Match was not found")

        
    
def edit_user():
    global user
    min_protein = int(get_input(f"What is your minimum wanted grams of protein? (previously {user.protein[0]}) "))
    max_protein = int(get_input(f"What is your maximum wanted grams of protein? (previously {user.protein[1]}) "))
    while (max_protein < min_protein):
        print(f"The maximum cannot be greater than the minimum of {min_protein}")
        max_protein = get_input(f"What is your maximum wanted grams of protein? (previously {user.protein[1]}) ")
        
    min_carb = int(get_input(f"What is your minimum wanted grams of carbs? (previously {user.carb[0]}) "))
    max_carb = int(get_input(f"What is your maximum wanted grams of carbs? (previously {user.carb[1]}) "))
    while (max_carb < min_carb):
        print(f"The maximum cannot be greater than the minimum of {min_carb}")
        max_carb = get_input(f"What is your maximum wanted grams of carbs? (previously {user.carb[1]}) ")
        
    min_fat = int(get_input(f"What is your minimum wanted grams of fat? (previously {user.fat[0]}) "))
    max_fat = int(get_input(f"What is your maximum wanted grams of fat? (previously {user.fat[1]}) "))
    while (max_fat < min_fat):
        print(f"The maximum cannot be greater than the minimum of {min_fat}")
        max_fat = get_input(f"What is your maximum wanted grams of fat? (previously {user.fat[1]}) ")
        
    min_calories = int(get_input(f"What is your minimum wanted grams of calories? (previously {user.calories[0]}) "))
    max_calories = int(get_input(f"What is your maximum wanted grams of calories? (previously {user.calories[1]}) "))
    while (max_calories < min_calories):
        print(f"The maximum cannot be greater than the minimum of {min_calories}")
        max_calories = get_input(f"What is your maximum wanted grams of calories? (previously {user.calories[1]}) ")

    user = User((min_protein, max_protein), (min_carb, max_carb), (min_fat, max_fat), (min_calories, max_calories))


# Quit the program
def quit_program():
    NutritionLibrary.save_food_items(foods)
    UserLibrary.save_user(user)
    print("Thank you for using this Meal Plan Generator!")

foods, groups, display_groups = NutritionLibrary.load_food_items()
user = UserLibrary.load_user()

print("This is a meal plan generator designed to create meal plans")
print("from a created list of food items to fit a created users")
print("requirements.")
print()

# Main program loop
while True:
    print()
    menu()
    print()
    choice = input("What would you like to do? ")
    print()
    if choice == '1':
        add_food()
    elif choice == '2':
        remove_food()
    elif choice == '3':
        NutritionLibrary.print_foods(foods)
    elif choice == '4':
        NutritionLibrary.generate_solution(foods, user, groups, display_groups)
    elif choice == '5':
        edit_user()
    elif choice == '6':
        quit_program()
        break
    elif choice == 'initialize':
        foods = NutritionLibrary.initialize()
    elif not(choice.isnumeric()):
        print("Please enter a numeric value.")
    else:
        print("Please select a valid option.")
