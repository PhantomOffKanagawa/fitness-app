var form = {
    id: "form",
    calories_row: {
      min_calories: {
        label: "Min Calories (kcal):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 1,
        },
        width: 6,
      },
      max_calories: {
        label: "Max Calories (kcal):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 1,
        },
        width: 6,
      },
    },
    min_row: {
      min_carbs: {
        label: "Min Carbs (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
      min_fat: {
        label: "Min Fat (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
      min_protein: {
        label: "Min Protein (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
    },
    max_row: {
      max_carbs: {
        label: "Max Carbs (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
      max_fat: {
        label: "Max Fat (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
      max_protein: {
        label: "Max Protein (g):",
        inputAttributes: {
          type: "number",
          required: true,
          placeholder: 0,
          min: 0,
          step: 0.1,
        },
      },
    },
    // submit_row: {
    //   submit: {
    //     inputAttributes: {
    //       type: "submit",
    //       value: "Update User",
    //     },
    //     width: 2,
    //     classes: ["btn", "btn-primary"],
    //   },
    // },
  };
  
  var user = {};
  
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
  
  async function webSaveUser() {
    const response = await fetch("/api/set_session_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

  function updateFormItems() {
    for(key in user) {
      document.getElementById(key + "_input").value = Number(user[key]);
    }
  }
  
  function updateUserJSON() {
    for(key in form) {
      if ( key == "id" || key == "submit_row") continue;
      const row = form[key];
      for (element_key in row) {
        user[element_key] = document.getElementById(element_key + "_input").value;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", async function () {
    // Populate Form
    populateFormElements(form);
  
    // Check session for json foods
    const response = await fetch("/api/get_session_user")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.session_data != {}) {
          user = data.session_data;
          updateFormItems();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        user = {};
      });
  
    // Handle Form Submission
    document.getElementById("form").addEventListener("submit", (e) => {
      e.preventDefault();
      updateUserJSON();
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
                user = jsonData;
                updateFormItems();
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
  