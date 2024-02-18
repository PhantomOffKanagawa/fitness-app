# Requirements
###### Glossary
- 🔮: Future possible functionality or idea
- ❗: Priority
- 🧠: High difficulty
## Actors
- User: Performs all primary uses of the app
- ExternalFoodDatabase: Allows easy addition of food items

## Use Cases
### Minimum
- Add Food Item
- Delete Food Item
- Edit Food Item
- See Foods
- Create Dish From Foods
- Delete Dish
- See Dish
- Generate Meal Plan
- Set Goal Macros
- Set Current Consumed Macros
- Save Food And Dishes
- Load Food And Dishes
- Generate Meal Plan

### Extras
- 🔮 Disable Food
- 🔮 Disable Dish
- 🔮 Set Macro Weight
> Decide if a Macro (e.g. calories) should: never be exceeded, always be exceeded, be within what range, or be prioritized how much
- 🔮 Set Meal Split
> How much should each meal contain
- 🔮 Set Meal Count
- 🔮 Substitute Item
> Remove an item and regenerate meal plan with rest of items the same

## Objects
### Entity
- Food
	- String -name
	- nutrition
		- int -calories
		- int -carb
		- int -protein
		- int -fat
	- float -minQuantity
	- float -maxQuantity
- FoodWrapper
	- Food -food
	- int quantity (positive)
- Meal
	- String -name
	- FoodWrapper\[] -foods ()
	- float -minQuantity
	- float -maxQuantity
- UserSettings
	- int -calorieGoal (positive <5000)
	- int -carbGoal (positive <5000)
	- int -proteinGoal (positive <5000)
	- int -fatGoal (positive <5000)
### Control
- Generate Meal List
- Edit Foods List
- Edit Dish List
- Set User Info
### Boundary
- Add Food Menu
- See Foods Menu
	- Delete Foods
- Edit Food Menu
- Main Window
	- Set User Info
	- 🔮 Set Meal Split