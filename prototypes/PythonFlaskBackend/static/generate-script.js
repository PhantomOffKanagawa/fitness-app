var results = [];
var foods = {};
const display_groups = ["Morning snack", "Breakfast", "Afternoon snack", "Lunch", "Dinner", "Evening snack", "Other"]

async function generate() {
  const response = await fetch("/api/generate")
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      results = data.response_data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(response);
  
  const response_foods = await fetch("/api/get_session_foods")
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      foods = data.session_data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(response_foods);

  for (index in results) {
    const plan = results[index]
    const items = [[],[],[],[],[],[],[]]
    const total = {calories: 0, carbs: 0, fat: 0, protein: 0}
    for (food in plan) {
      if (plan[food] != 0) {
        // console.log(`${food} + ${foods[food].display_group} + ${plan[food]}`);
        const display_index = display_groups.indexOf(foods[food].display_group);
        if (display_index != -1) {
          items[display_index].push([plan[food], food])
        } else {
          items[items.length - 1].push([plan[food], food])
        }

        for (stat in total) {
          total[stat] += (foods[food][stat] * plan[food]);
        }
      }
    }

    // Create meal-plan
    // (div) Meal Plan Wrapper
    let wrapper = document.createElement("div");
    wrapper.classList.add("card", "mb-4");
    resultsContainer.appendChild(wrapper);

    // // > (div) Card Header
    // let header = document.createElement("div");
    // header.classList.add("card-header");
    // wrapper.appendChild(header);

    // // > > (h2) Meal Plan Label
    // let label = document.createElement("h2");
    // label.classList.add("card-title", "text-center");
    // label.textContent = "Meal Plan " + index;
    // header.appendChild(label);

    // > (div) Card Body
    let body = document.createElement("div");
    body.classList.add("card-body");
    wrapper.appendChild(body);

    // Add each group
    for (item_index in items) {
      // Skip 0 quantity groups
      if (items[item_index].length == 0) continue;

      // > > (div) Display Group Wrapper
      let groupWrapper = document.createElement("div");
      groupWrapper.classList.add("group");
      body.appendChild(groupWrapper);

      // > > > (h3) Display Group Label
      let label = document.createElement("h3");
      label.textContent = display_groups[item_index];
      groupWrapper.appendChild(label);

      // > > > (div) Food Container
      let food_container = document.createElement("div");
      food_container.classList.add("food-container");
      groupWrapper.appendChild(food_container);

      const group_total = {calories: 0, carbs: 0, fat: 0, protein: 0}

      // Add each food item in display group
      const foodsList = items[item_index];
      for (food_index in foodsList) {
        // Update group_total
        for (stat in group_total) {
          group_total[stat] += (foods[foodsList[food_index][1]][stat] * foodsList[food_index][0]);
        }

        // > > > > (div) Food Name and Quantity
        let food = document.createElement("div");
        food.textContent = `${foodsList[food_index][0]}x ${foodsList[food_index][1]}`;
        food.classList.add("food");
        food_container.appendChild(food);
      }

      // > > > (h3) Group Stats
      let group_stats = document.createElement("div");
      group_stats.classList.add("stats-container");
      group_stats.textContent = `Calories: ${group_total.calories.toFixed(0)}, Carbs: ${group_total.carbs.toFixed(1)}, Fat: ${group_total.fat.toFixed(1)}, Protein: ${group_total.protein.toFixed(1)}`;
      groupWrapper.appendChild(group_stats);
    }

    // > (div) Card Footer
    let footer = document.createElement("div");
    footer.classList.add("card-footer");
    wrapper.appendChild(footer);

    // > > (h5) Meal Plan Stats
    let stats = document.createElement("h5");
    stats.classList.add("card-subtitle", "text-center", "py-2");
    stats.textContent = `Calories: ${total.calories.toFixed(0)}, Carbs: ${total.carbs.toFixed(1)}, Fat: ${total.fat.toFixed(1)}, Protein: ${total.protein.toFixed(1)}`;
    footer.appendChild(stats);
  }
}

document.addEventListener("DOMContentLoaded", async function () {

});
