class User:
    def __init__(self, protein_params, carb_params, fat_params, calorie_params):
        self.protein = protein_params
        self.carb = carb_params
        self.fat = fat_params
        self.calories = calorie_params

    def __str__(self):
        return self.name