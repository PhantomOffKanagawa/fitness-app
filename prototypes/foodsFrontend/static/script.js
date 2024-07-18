var form = {
  id: "form",
  row1: {
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
  row2: {
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
  row3: {
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
      label: "Min Servings:",
      default: 0.5,
      inputAttributes: {
        type: "number",
        placeholder: 0.5,
        min: 0.5,
        step: 0.5,
      },
    },
  },
  row4: {
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
  row5: {
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

// * Make JSON Form
// *
// *
function fillInForm(formData) {
  const form = document.getElementById(formData.id);

  // Create elements row by row
  for (const rowName in formData) {
    //Skip non-rows
    if (rowName == "id") continue;

    const row = document.createElement("div");
    row.classList.add("row", "g-3");

    const rowData = formData[rowName];
    for (const input in rowData) {
      row.appendChild(createInput(input, rowData[input]));
    }

    form.appendChild(row);
    const br = document.createElement("br");
    form.appendChild(br);
  }
}

function createInput(name, inputData) {
  const inputName = name + "_input";

  const column = document.createElement("div");
  if ("width" in inputData) column.classList.add("col-sm-" + inputData.width);
  else column.classList.add("col-sm-4");

  if ("label" in inputData) {
    const label = document.createElement("label");
    label.setAttribute("for", inputName);
    label.classList.add("form-label");
    label.appendChild(document.createTextNode(inputData.label));
    column.appendChild(label);
  }

  const input = document.createElement("input");
  // Auto-generated inputs
  input.setAttribute("name", inputName);
  input.setAttribute("id", inputName);

  // Handle attributes for input
  for (const attribute in inputData.inputAttributes) {
    input.setAttribute(attribute, inputData.inputAttributes[attribute]);
  }

  // Data list if needed
  if ("list" in inputData) {
    const datalistID = name + "_list";
    input.setAttribute("list", datalistID);
    const datalist = document.createElement("datalist");
    datalist.setAttribute("id", datalistID);

    // Create all options
    for (const i in inputData.list) {
      const option = document.createElement("option");
      option.setAttribute("value", inputData.list[i]);
      datalist.appendChild(option);
    }
    column.appendChild(datalist);
  }

  // Classes
  input.classList.add("form-control");
  if ("classes" in inputData) {
    for (const i in inputData.classes) {
      input.classList.add(inputData.classes[i]);
    }
  }

  input.appendChild(document.createTextNode(inputData.label));
  column.appendChild(input);

  return column;
}

// * Using Dynamic JSON Form
// *
// *
function appendFood() {
  foodData = {};

  foodData.calories = Number(document.getElementById("calorieInput").value);
  document.getElementById("calorieInput").value = "";

  foodData.carbs = Number(document.getElementById("carbsInput").value);
  document.getElementById("carbsInput").value = "";

  foodData.protein = Number(document.getElementById("proteinInput").value);
  document.getElementById("proteinInput").value = "";

  foodData.fat = Number(document.getElementById("fatInput").value);
  document.getElementById("fatInput").value = "";

  foodData.min_serving =
    document.getElementById("minServingInput").value == ""
      ? 1
      : Number(document.getElementById("minServingInput").value);
  document.getElementById("minServingInput").value = "";

  foodData.max_serving =
    document.getElementById("maxServingInput").value == ""
      ? 1
      : Number(document.getElementById("maxServingInput").value);
  document.getElementById("maxServingInput").value = "";

  foodData.serving_step =
    document.getElementById("servingStepInput").value == ""
      ? 0.5
      : Number(document.getElementById("servingStepInput").value);
  document.getElementById("servingStepInput").value = "";

  foodData.group = document.getElementById("groupInput").value;
  document.getElementById("groupInput").value = "";

  foodData.display_group = document.getElementById("displayGroupInput").value;
  document.getElementById("displayGroupInput").value = "";

  foodData.required = document.getElementById("requiredInput").checked;
  document.getElementById("requiredInput").checked = "";

  foodData.enabled = document.getElementById("enabledInput").checked;
  document.getElementById("enabledInput").checked = "";

  foods[document.getElementById("nameInput").value] = foodData;
  document.getElementById("nameInput").value = "";

  jsonToTable(foods, document.getElementById("table"));
}

function appendFood() {
  var foodData = {};
  var name = "";

  for (const row in form) {
    if (row == "id") continue;

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
            document.getElementById(input + "_input").checked = form[row][input]["default"];
            break;
          // If number convert to number
          case "number":
            foodData[input] =
            (document.getElementById(input + "_input").value == ""
              ? form[row][input]["default"]
              : Number(document.getElementById(input + "_input").value));

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

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

document.addEventListener("DOMContentLoaded", function () {
  // Populate Form
  fillInForm(form);

  // Check localStorage for json foods
  if (window.localStorage.getItem("foods") != null)
    try {
      foods = JSON.parse(window.localStorage.getItem("foods"));
      jsonToTable(foods, document.getElementById("table"));
    } catch (e) {
      foods = {};
    }

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
