

function saveToLocalStorage(e) {
  e.preventDefault();
  let amount1 = e.target.amount.value;
  let description1 = e.target.description.value;
  let category1 = e.target.category.value;

  let obj = { amount1, description1, category1 }
  localStorage.setItem('USERDETAILS', JSON.stringify(obj));
  showUserOnScreen(obj)

}

function showUserOnScreen(obj) {
  let parentElem = document.getElementById('listOfItem')
  let childElem = document.createElement('li')
  childElem.textContent = obj.amount1 + "-" + obj.description1 + "-" + obj.category1

  let deleteButton = document.createElement('input')
  deleteButton.type = "button"
  deleteButton.value = "Delete"
  deleteButton.onclick = () => {
    localStorage.removeItem('USERDETAILS')
    parentElem.removeChild(childElem)
  }

  let editButton = document.createElement('input')
  editButton.type = "button"
  editButton.value = "Edit"
  editButton.onclick = () => {
    localStorage.removeItem('USERDETAILS')
    parentElem.removeChild(childElem)
    document.getElementById('amount').value = obj.amount1
    document.getElementById('description').value = obj.description1
    document.getElementById('category').value = obj.category1
  }

  childElem.appendChild(deleteButton)
  childElem.appendChild(editButton)
  parentElem.appendChild(childElem)



}