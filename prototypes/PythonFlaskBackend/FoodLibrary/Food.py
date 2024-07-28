class Food:
    def __init__(self, name, protein, carb, fat, calories, min_quantity=0, max_quantity=1, serving_step=0.5, display_group="", required=False, enabled=True):
        self.name = name
        self.protein = protein
        self.carb = carb
        self.fat = fat
        self.calories = calories
        self.min_quantity = min_quantity
        self.max_quantity = max_quantity
        self.serving_step = serving_step
        self.display_group = display_group
        self.required = required
        self.enabled = enabled

    # def __str__(self):
    #     return self.name