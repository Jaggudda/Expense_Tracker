let currentId = "";

function saveToLocalStorage(e) {
  e.preventDefault();
  let amount = e.target.amount.value;
  let description = e.target.description.value;
  let category = e.target.category.value;

  let obj = { amount, description, category }
  let expenses = localStorage.getItem("expenses");
  expenses = JSON.parse(expenses);
  if (expenses === null || expenses.length < 1) {
    obj.id = 1;
    expenses = [obj];
    localStorage.setItem('expenses', JSON.stringify(expenses));
  } else {
    if (!Array.isArray(expenses)) {
      console.log("Expenses is not array");
      return;
    }
    const lastExpense = expenses[expenses.length - 1];
    obj.id = parseInt(lastExpense.id) + 1;
    expenses.push(obj);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  renderExpensesList(expenses);
}

function renderExpensesList(expensesList) {
  const tbody = document.getElementById("tbody");
  let htmlString = "";
  expensesList.map((item) => {
    htmlString += `<tr>
    <td>${item.amount}</td>
    <td>${item.description}</td>
    <td>${item.category}</td>
    <td>
        <span class="icon" onclick="edit(${item.id})" ><i class="fas fa-edit" ></i></span>
        <span class="icon" onclick="edit(${item.id}, 'delete')"><i class="fas fa-trash"></i></span>
    </td>
  </tr>`
  })
  tbody.innerHTML = htmlString;

}

function edit(id, type = "view") {
  let expensesList = localStorage.getItem('expenses');
  expensesList = JSON.parse(expensesList);
  const expenseIndex = expensesList.findIndex((item) => {
    return parseInt(item.id) === parseInt(id);
  })
  if (expenseIndex === -1) {
    console.log("No expense found")
    return;
  }
  const amountIP = document.getElementById("amount");
  const descriptionIP = document.getElementById("description");
  const categoryIP = document.getElementById("category");

  if (type === "view") {
    amountIP.value = expensesList[expenseIndex].amount;
    descriptionIP.value = expensesList[expenseIndex].description;
    categoryIP.value = expensesList[expenseIndex].category;
    document.getElementById("addExpense").classList.add("d-none");
    document.getElementById("editExpense").classList.remove("d-none");
    currentId = id;
  } else if (type === "edit") {
    console.log("edit")
    expensesList[expenseIndex].amount = amountIP.value;
    expensesList[expenseIndex].description = descriptionIP.value;
    expensesList[expenseIndex].category = categoryIP.value;
    localStorage.setItem('expenses', JSON.stringify(expensesList));
    renderExpensesList(expensesList);
  } else if (type === "delete") {
    expensesList.splice(expenseIndex, 1);
    localStorage.setItem('expenses', JSON.stringify(expensesList));
    renderExpensesList(expensesList);
  }
}

document.getElementById("editExpense").addEventListener("click", (e) => {
  e.preventDefault();
  edit(currentId, "edit");
});

window.addEventListener("load", () => {
  let list = JSON.parse(localStorage.getItem("expenses"));
  renderExpensesList(list);
})
