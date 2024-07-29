var form = {
    id: "form",
    name_row: {
      name: {
        label: "Name:",
        inputAttributes: {
          type: "text",
          required: true,
          placeholder: "Hamburger",
        },
        width: 6,
      },
      calories: {
        label: "Calories:",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
        },
        width: 6,
      },
    },
    macro_row: {
      carbs: {
        label: "Carbs (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
      fat: {
        label: "Fat (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
      protein: {
        label: "Protein (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
    },
    serving_row: {
      min_serving: {
        label: "Min Servings:",
        default: 1,
        inputAttributes: {
          type: "number",
          placeholder: 1,
          min: 0.5,
          step: 0.5,
        },
      },
      max_serving: {
        label: "Max Servings:",
        default: 1,
        inputAttributes: {
          type: "number",
          placeholder: 1,
          min: 0.5,
          step: 0.5,
        },
      },
      serving_step: {
        label: "Servings Step:",
        default: 0.5,
        inputAttributes: {
          type: "number",
          placeholder: 0.5,
          min: 0.5,
          step: 0.5,
        },
      },
    },
    extras_row: {
      group: {
        label: "Group:",
        inputAttributes: {
          type: "text",
          placeholder: "proteinBar",
        },
      },
      display_group: {
        label: "Display Group:",
        inputAttributes: {
          type: "text",
          placeholder: "Dinner",
        },
        list: [
          "Breakfast",
          "Lunch",
          "Dinner",
          "Morning snack",
          "Afternoon snack",
          "Evening snack",
        ],
      },
      required: {
        label: "Required:",
        default: false,
        inputAttributes: {
          type: "checkbox",
        },
        width: 2,
        classes: ["form-check-input"],
      },
      enabled: {
        label: "Enabled:",
        default: true,
        inputAttributes: {
          type: "checkbox",
          checked: true,
        },
        width: 2,
        classes: ["form-check-input"],
      },
    },
    submit_row: {
      submit: {
        inputAttributes: {
          type: "submit",
          value: "Add/Update Food",
        },
        width: 2,
        classes: ["btn", "btn-primary"],
      },
    },
  };
  
  var foods = {};
  
  // * Using Dynamic JSON Form
  // *
  // *
//   function appendFood() {
//     foodData = {};
  
//     foodData.calories = Number(document.getElementById("calorieInput").value);
//     document.getElementById("calorieInput").value = "";
  
//     foodData.carbs = Number(document.getElementById("carbsInput").value);
//     document.getElementById("carbsInput").value = "";
  
//     foodData.protein = Number(document.getElementById("proteinInput").value);
//     document.getElementById("proteinInput").value = "";
  
//     foodData.fat = Number(document.getElementById("fatInput").value);
//     document.getElementById("fatInput").value = "";
  
//     foodData.min_serving =
//       document.getElementById("minServingInput").value == ""
//         ? 1
//         : Number(document.getElementById("minServingInput").value);
//     document.getElementById("minServingInput").value = "";
  
//     foodData.max_serving =
//       document.getElementById("maxServingInput").value == ""
//         ? 1
//         : Number(document.getElementById("maxServingInput").value);
//     document.getElementById("maxServingInput").value = "";
  
//     foodData.serving_step =
//       document.getElementById("servingStepInput").value == ""
//         ? 0.5
//         : Number(document.getElementById("servingStepInput").value);
//     document.getElementById("servingStepInput").value = "";
  
//     foodData.group = document.getElementById("groupInput").value;
//     document.getElementById("groupInput").value = "";
  
//     foodData.display_group = document.getElementById("displayGroupInput").value;
//     document.getElementById("displayGroupInput").value = "";
  
//     foodData.required = document.getElementById("requiredInput").checked;
//     document.getElementById("requiredInput").checked = "";
  
//     foodData.enabled = document.getElementById("enabledInput").checked;
//     document.getElementById("enabledInput").checked = "";
  
//     foods[document.getElementById("nameInput").value] = foodData;
//     document.getElementById("nameInput").value = "";
  
//     jsonToTable(foods, document.getElementById("table"));
//   }
  
  function appendFood() {
    var foodData = {};
    var name = "";
  
    for (const row in form) {
      if (row == "id" || row == "submit_row") continue;
  
      for (const input in form[row]) {
        if (input == "name") {
          name = document.getElementById(input + "_input").value;
          continue;
        }
  
        // If missing type or type is text do basic
        if (
          !("inputAttributes" in form[row][input]) ||
          !("type" in form[row][input]["inputAttributes"]) ||
          form[row][input]["inputAttributes"]["type"] == "text"
        ) {
          foodData[input] = document.getElementById(input + "_input").value;
          document.getElementById(input + "_input").value = "";
        } else {
          // Switch by type
          switch (form[row][input]["inputAttributes"]["type"]) {
            // If checkbox use .checked
            case "checkbox":
              foodData[input] = document.getElementById(input + "_input").checked;
              document.getElementById(input + "_input").checked =
                form[row][input]["default"];
              break;
            // If number convert to number
            case "number":
              foodData[input] =
                document.getElementById(input + "_input").value == ""
                  ? form[row][input]["default"]
                  : Number(document.getElementById(input + "_input").value);
  
              document.getElementById(input + "_input").value = "";
              break;
            // If button ignore
            case "button":
            case "submit":
              break;
          }
        }
      }
    }
  
    foods[name] = foodData;
    jsonToTable(foods, document.getElementById("table"));
  }
  
  function loadFood(name) {
    var foodData = foods[name];
  
    for (const row in form) {
      if (row == "id") continue;
  
      for (const input in form[row]) {
        if (input == "submit") continue;
        if (input == "name") {
          document.getElementById(input + "_input").value = name;
          continue;
        }
        if (
          "inputAttributes" in form[row][input] &&
          "type" in form[row][input]["inputAttributes"] &&
          form[row][input]["inputAttributes"]["type"] == "checkbox"
        ) {
          document.getElementById(input + "_input").checked = foodData[input];
          continue;
        }
  
        document.getElementById(input + "_input").value = foodData[input];
      }
    }
  }
  
  // * Generate table from JSON
  // *
  // *
  function jsonToTable(json, table) {
    const foods = Object.keys(json);
  
    table.innerHTML = "";
  
    // Create thead row
    let tableHeader = document.createElement("thead");
    table.appendChild(tableHeader);
    let tableRow = document.createElement("tr");
    // Name
    let rowItem = document.createElement("th");
    rowItem.appendChild(document.createTextNode("Name"));
    tableRow.appendChild(rowItem);
    // Remaining Attributes
    Object.keys(json[foods[0]]).forEach((key) => {
      let rowItem = document.createElement("th");
      rowItem.appendChild(document.createTextNode(key));
      tableRow.appendChild(rowItem);
    });
    rowItem = document.createElement("th");
    rowItem.appendChild(document.createTextNode("Edit"));
    tableRow.appendChild(rowItem);
    rowItem = document.createElement("th");
    rowItem.appendChild(document.createTextNode("Delete"));
    tableRow.appendChild(rowItem);
    tableHeader.appendChild(tableRow);
  
    // Create tbody rows
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    foods.forEach((food) => {
      let tableRow = document.createElement("tr");
      // Name
      let rowItem = document.createElement("td");
      rowItem.appendChild(document.createTextNode(food));
      tableRow.appendChild(rowItem);
      // Remaining Attributes
      Object.values(json[food]).forEach((value) => {
        let rowItem = document.createElement("td");
        rowItem.appendChild(document.createTextNode(value));
        tableRow.appendChild(rowItem);
      });
  
      rowItem = document.createElement("td");
      let button = document.createElement("button");
      button.setAttribute("onClick", 'loadFood("' + food + '")');
      button.appendChild(document.createTextNode("Edit"));
      button.classList.add("btn", "btn-secondary");
      rowItem.appendChild(button);
      tableRow.appendChild(rowItem);
  
      rowItem = document.createElement("td");
      button = document.createElement("button");
      button.setAttribute("onClick", 'deleteFood("' + food + '")');
      button.appendChild(document.createTextNode("Delete"));
      button.classList.add("btn", "btn-danger");
      rowItem.appendChild(button);
      tableRow.appendChild(rowItem);
  
      tableBody.appendChild(tableRow);
    });
  }
  
  function deleteFood(name) {
    delete foods[name];
    jsonToTable(foods, document.getElementById("table"));
  }
  
  async function webSaveFoods() {
    // window.localStorage.setItem("foods", JSON.stringify(foods));
    const response = await fetch("/api/set_session_foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foods),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(response);
  }
  
  document.addEventListener("DOMContentLoaded", async function () {
    // Populate Form
    populateFormElements(form);
  
    // Check localStorage for json foods
    const response = await fetch("/api/get_session_foods")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.session_data != {}) {
          foods = data.session_data;
          jsonToTable(foods, document.getElementById("table"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        foods = {};
      });
  
    // if (window.localStorage.getItem("foods") != null)
    //   try {
    //     foods = JSON.parse(window.localStorage.getItem("foods"));
    //     jsonToTable(foods, document.getElementById("table"));
    //   } catch (e) {
    //     foods = {};
    //   }
  
    // Handle Form Submission
    document.getElementById("form").addEventListener("submit", (e) => {
      e.preventDefault();
      appendFood();
    });
  
    // Initialize Drag and Drop File
    document
      .getElementById("drop-zone")
      .addEventListener("dragover", function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.add("dragover");
      });
  
    document
      .getElementById("drop-zone")
      .addEventListener("dragleave", function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove("dragover");
      });
  
    document
      .getElementById("drop-zone")
      .addEventListener("drop", function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove("dragover");
  
        let files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          if (file.type === "application/json") {
            let reader = new FileReader();
            reader.onload = function (e) {
              try {
                let jsonData = JSON.parse(e.target.result);
                foods = jsonData;
                jsonToTable(foods, document.getElementById("table"));
                alert("File parsed successfully!");
              } catch (error) {
                alert("Error parsing JSON: " + error);
              }
            };
            reader.readAsText(file);
          } else {
            alert("Please drop a valid JSON file.");
          }
        }
      });
  });
  