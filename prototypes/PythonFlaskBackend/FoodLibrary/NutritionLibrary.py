# import pickle
import json
import os
from FoodLibrary.Food import Food
from FoodLibrary.User import User

try:
    from constraint import Problem, MinSumConstraint, MaxSumConstraint, SomeNotInSetConstraint
except ImportError:
    print("Error importing python-constraint")
    print("This is what handles the calculation of the Constraint Satisfaction Problem")
    print("\tFound at: https://pypi.org/project/python-constraint/")
    print("\tInstalled with: pip install python-constraint")
    exit()

# # Outdated pickle items
# # Save food items to files
# def save_food_items(foods):
#     if not os.path.exists("foods"):
#         os.makedirs("foods")
#     for food in foods:
#         filename = f"foods/{food.name}.food"
#         with open(filename, 'wb') as file:
#             pickle.dump(food, file)
#         print(f"Saved {food.name} to {filename}")

# # Load food items from files
# def load_food_items():
#     foods = []
#     if os.path.exists("foods"):
#         for filename in os.listdir("foods"):
#             if filename.endswith(".food"):
#                 with open(f"foods/{filename}", 'rb') as food_file:
#                     food = pickle.load(food_file)
#                     foods.append(food)
#                     print(f"Loaded {food.name} from {filename}")
#     else:
#         print("No 'foods' folder found. Initializing defaults.")
#         return initialize_foods()
#     return foods

def load_food_items(json_foods):
    foods = []
    groups = {}
    display_groups = ["Morning snack", "Breakfast", "Afternoon snack", "Lunch", "Dinner", "Evening snack"]
    # if os.path.exists("data") and os.path.exists("data/foods.json"):
        # with open("data/foods.json", 'rb') as food_file:
            # foods_dict = json.load(food_file)
    if json_foods != {}:
        foods_dict = json_foods
        for name, data in foods_dict.items():
            if not data["enabled"]:
                continue

            food = Food(name, data["protein"], data["carbs"], data["fat"], data["calories"], data["min_serving"], data["max_serving"], data["serving_step"], data["display_group"], data["required"], data["enabled"])
            foods.append(food)

            if data["group"] != "":
                if data["group"] not in groups:
                    groups[data["group"]] = []
                groups[data["group"]].append(food)
                print("Group " + str(groups[data["group"]]))
                print("Last Foods " + str(foods[-1]))
                print("Set test " + str(foods[-1] in groups[data["group"]]))

            # Bad but want ordered unique "set"
            if data["display_group"] not in display_groups:
                display_groups.append(data["display_group"])

            print(f"Loaded {name} from json")
            print("    Serving Range is: " + str([x / 10.0 for x in range(int(food.min_quantity * 10), int(food.max_quantity * 10 + 5), 5)]))
    else:
        print("No 'foods' folder found. Initializing defaults.")
        return initialize_foods()
    return foods, groups, display_groups

def initialize_foods():
    # Define food items
    return [
        Food("Kodak Pancake", 22.1, 43.6, 4.9, 297, 0, 2),
        Food("Protein Shake", 88.2, 65.3, 25, 788),
        Food("Custom Chipotle Bowl", 53.5, 82.7, 24, 772, 0, 1),
        Food("Yogurt with Oats & Jam", 21, 46, 3, 290),
        Food("Chai Latte", 6, 32, 3.7, 180, 1, 1)
    ]

def generate_solution(foods: list, user: User, groups: dict, display_groups: list, generate_number: int = None):
    # Create a problem instance
    problem = Problem()

    # Add variables for each food item with quantity constraints
    for food in foods:
        servings = [x / 10.0 for x in range(int(food.min_quantity * 10), int((food.max_quantity + food.serving_step) * 10), int(food.serving_step * 10))]
        if not food.required:
            servings.append(0)
        problem.addVariable(food.name, servings)

    # Define functions for constraints
    def min_protein_constraint(*args):
        c = args
        return sum(c[i] * food.protein for i, food in enumerate(foods)) >= user.protein[0]

    def max_protein_constraint(*args):
        c = args
        return sum(c[i] * food.protein for i, food in enumerate(foods)) <= user.protein[1]

    def min_carb_constraint(*args):
        c = args
        return sum(c[i] * food.carb for i, food in enumerate(foods)) >= user.carb[0]

    def max_carb_constraint(*args):
        c = args
        return sum(c[i] * food.carb for i, food in enumerate(foods)) <= user.carb[1]

    def min_fat_constraint(*args):
        c = args
        return sum(c[i] * food.fat for i, food in enumerate(foods)) >= user.fat[0]

    def max_fat_constraint(*args):
        c = args
        return sum(c[i] * food.fat for i, food in enumerate(foods)) <= user.fat[1]

    def min_calories_constraint(*args):
        c = args
        return sum(c[i] * food.calories for i, food in enumerate(foods)) >= user.calories[0]

    def max_calories_constraint(*args):
        c = args
        return sum(c[i] * food.calories for i, food in enumerate(foods)) <= user.calories[1]
    
    def group_constaint(*args):
        c = args
        # Bad O(nm) loop (lower by expanding for loop and escaping on match 2)
        for group in groups:
            if sum((1 if (c[i] > 0 and food in groups[group]) else 0) for (i, food) in enumerate(foods)) > 1:
                return 0
        return 1

    # Add constraint for sum of protein and calories
    problem.addConstraint(min_protein_constraint)
    problem.addConstraint(max_protein_constraint)
    problem.addConstraint(min_carb_constraint)
    problem.addConstraint(max_carb_constraint)
    problem.addConstraint(min_fat_constraint)
    problem.addConstraint(max_fat_constraint)
    problem.addConstraint(min_calories_constraint)
    problem.addConstraint(max_calories_constraint)

    # Add group constraints
    problem.addConstraint(group_constaint)


    # Add group constraints
    # for group in groups:
    #     print(group + str(groups[group]) + " " + str(len(groups[group]) - 1))
    #     problem.addConstraint(SomeNotInSetConstraint(groups[group], 2))

    # Solve the problem
    solution_iterator = problem.getSolutionIter()
    solutions = []
    for _ in range(5 if generate_number is None else generate_number):
        solutions.append(next(solution_iterator))

    # Print solutions
    # if solutions:
    #     for solution in solutions:
    #         print("Solution:")
    #         total = [0, 0, 0, 0]
    #         foods_by_group = {k: [] for k in display_groups}
            
    #         for food in foods:
    #             quantity = solution[food.name]
    #             if quantity > 0:
    #                 foods_by_group[food.display_group].append((quantity, food))
    #                 total[0] += quantity * food.protein
    #                 total[1] += quantity * food.carb
    #                 total[2] += quantity * food.fat
    #                 total[3] += quantity * food.calories
    #         for group in foods_by_group:
    #             if len(foods_by_group[group]) != 0:
    #                 print("    " + group)
    #                 for quantity, food in foods_by_group[group]:
    #                     print( f"        {quantity} {food.name}")

    #         print(f"--- Includes {round(total[0], 2)}g of Protein, {round(total[1], 2)}g of Carbs, {round(total[2], 2)}g of Fat, {round(total[3], 2)} calories")
    #         print()
    # else:
    #     print("No solutions found.")
    
    return solutions

def print_foods(foods):
    print("Food List:")
    for food in foods:
        print(f"Name: {food.name}")
        print(f"Protein: {food.protein}g")
        print(f"Carb: {food.carb}g")
        print(f"Fat: {food.fat}g")
        print(f"Calories: {food.calories} kcal")
        print(f"Min Quantity: {food.min_quantity}")
        print(f"Max Quantity: {food.max_quantity}")
        print()