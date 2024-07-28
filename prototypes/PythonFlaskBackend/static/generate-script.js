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
    for (food in plan) {
      if (plan[food] != 0) {
        // console.log(`${food} + ${foods[food].display_group} + ${plan[food]}`);
        const display_index = display_groups.indexOf(foods[food].display_group);
        if (display_index != -1) {
          items[display_index].push([plan[food], food])
        } else {
          items[items.length - 1].push([plan[food], food])
        }
      }
    }

    // Create meal-plan
    let wrapper = document.createElement("div");
    wrapper.classList.add("meal-plan");
    resultsContainer.appendChild(wrapper);
    let label = document.createElement("h2");
    label.textContent = "Meal Plan " + index;
    wrapper.appendChild(label);
    for (item_index in items) {
      if (items[item_index].length == 0) continue;
      let groupWrapper = document.createElement("div");
      groupWrapper.classList.add("group");
      wrapper.appendChild(groupWrapper);
      let label = document.createElement("h3");
      label.textContent = display_groups[item_index];
      groupWrapper.appendChild(label);
      const foodsList = items[item_index];
      for (food_index in foodsList) {
        let food = document.createElement("div");
        food.textContent = `${foodsList[food_index][0]}x ${foodsList[food_index][1]}`;
        food.classList.add("food");
        groupWrapper.appendChild(food);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", async function () {

});
