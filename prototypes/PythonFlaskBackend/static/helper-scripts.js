// * Make JSON Form
// *
// *
function populateFormElements(formData) {
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

// * Generate table from JSON
// *
// *
function jsonToTable(json, table) {
  const items = Object.keys(json);

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
  Object.keys(json[items[0]]).forEach((key) => {
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
  items.forEach((food) => {
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

// * Download string as file
// *
// *
function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
