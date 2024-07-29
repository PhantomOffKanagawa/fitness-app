# fitness-app
An ongoing project focused on creating a general fitness app and focusing on improving principles and practices

## General Goals
- Focus on improving principles and practices
- Have a weekly write-up and optionally a weekly product explaining what happened
- Focus more on "Throw-away prototyping" to get early functionality
- Make something that works for me rather than focusing on perfection
- Focus on early requirements elicitation rather than taking everything on from the start

## Feature Plans
### App Pages
- Weekly Schedule
- Daily Foods
- Habit Tracker

## Progress

### Features
- Online Barebones Python Flask Server in `/prototypes/PythonFlaskBackend/Server.py`
  - Allows Food Entry/Editing/Removal
    - Allows the following attributes:
      - Name
      - Calories, Carbs, Fat, Protein
      - Min Servings (Minimum Number of Servings to Include)
      - Max Servings (Maximum Number of Servings to Include)
      - Serving Step (Granularity of Servings)
      - Group (Name of group of food, only one food from a group can be in a plan at a time)
      - Display Group (What the food should display as)
      - Required (Whether the food should be required to be in all plans)
      - Enabled (Whether a food should be used when generating plans)
  - Allows Generation of Meal Plans
  - Allows Editing of User
  - Saves User and Foods to Session or can be downloaded and loaded as local json files

### Current Focus
- [Requirements Elicitation](markdown/markdown/RequirementsElicitation.md)
- [Daily Foods](markdown/DailyFoodsIndex.md)

### Weekly Tracking
- [Week of 2/11](markdown/weekly/2024-02-11-weekly-page.md)
- [Week of 6/2](markdown/weekly/2024-06-02-weekly-page.md)
- [Week of 6/2](markdown/weekly/2024-06-02-weekly-page.md)
- [Week of 7/7](markdown/weekly/2024-07-07-weekly-page.md)
- [Week of 7/14](markdown/weekly/2024-07-14-weekly-page.md)
- [Week of 7/28](markdown/weekly/2024-07-28-weekly-page.md)

## Notes
### Programs Used
- **Obsidian**: For Markdown note management
	- **Marp**: Plugin for slide products
- **VS Code**: For code editor
### Directory Format
- `markdown/`: holds all markdown files in `PascalCase.md` format
	- `weekly/`: holds all weekly pages in `yyyy-mm-dd-weekly-page.md` format
		- `slides/`: holds all slide type products in `yyyy-mm-dd-slides.md` format 