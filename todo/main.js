const todoArray = localStorage.getItem('todoArray') ? JSON.parse(localStorage.getItem('todoArray')) : new Array();

const tableBodyElement = document.querySelector('tbody');
const successAlertElement = document.querySelector('#successAlert');
const errorAlertElement = document.querySelector('#errorAlert');
const emptyListElement = document.createElement('tr');

window.onload = function() {
    if (todoArray.length !== 0) {
        todoArray.forEach((item, index) => addToList(item, index));
    } else {
        showEmptyState();
    }
};

function addTodoItem(e) {
    e.preventDefault();
    const item = document.querySelector('#newItem');

    if (todoArray.length !== 0) {
        const itemDupe = todoArray.filter(todo => item.value === todo);
        if (itemDupe.length !== 0) {
            displayAlert('error');
        } else {
            addItem(item.value);
            displayAlert('success');
        }
    } else {
        addItem(item.value);
        displayAlert('success');
    }

    item.value = '';
}

/**
 * 
 * @param {success/error} alert 
 */
function displayAlert(alert) {
    switch (alert) {
        case 'success':
            successAlertElement.hidden = false;
            setTimeout(() => successAlertElement.hidden = true, 2500);
            break;
        case 'error':
            errorAlertElement.hidden = false;
            setTimeout(() => errorAlertElement.hidden = true, 2500);
            break;
    }
}

function addItem(item) {
    const isEmpty = document.querySelector('#emptyDisplay');
    if (isEmpty) isEmpty.remove();

    let itemIndex = todoArray.length <= 1 ? todoArray.length !== 0 ? 1 : 0 : todoArray.length;
    todoArray.push(item)
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
    addToList(item, itemIndex);
}

function addToList(item, index) {
    const tableRowElement = document.createElement('tr');
    const tableDataCellElement1 = tableRowElement.insertCell(0);
    const tableDataCellElement2 = tableRowElement.insertCell(1);

    const editButtonElement = document.createElement('button');
    const removeButtonElement = document.createElement('button');
    const updateButtonElement = document.createElement('button');

    tableRowElement.classList = 'table';
    tableRowElement.id = `tableItem-${index}`;

    tableDataCellElement2.classList = 'd-flex justify-content-end';

    editButtonElement.classList = 'btn btn-info mr-1';
    updateButtonElement.classList = 'btn btn-success mr-1';
    removeButtonElement.classList = 'btn btn-danger';

    editButtonElement.innerHTML = 'Edit';
    editButtonElement.id = `edit-${index}`;

    updateButtonElement.innerHTML = 'Update';
    updateButtonElement.id = `update-${index}`;
    updateButtonElement.hidden = true;

    removeButtonElement.innerHTML = 'Remove';
    removeButtonElement.id = `remove-${index}`;

    const textHolder = document.createElement('span');
    textHolder.id = `textHolder-${index}`;
    textHolder.innerText = item;

    tableDataCellElement1.appendChild(textHolder);
    tableDataCellElement1.id = `item-${index}`;

    tableDataCellElement2.appendChild(editButtonElement);
    tableDataCellElement2.appendChild(updateButtonElement);
    tableDataCellElement2.appendChild(removeButtonElement);
    tableBodyElement.appendChild(tableRowElement);
}

document.addEventListener('click',function(e){
    const clickedElement = e.target.id;
    const actionButton = clickedElement.includes('remove') ? 'remove' : clickedElement.includes('edit') ? 'edit' : 'update';
    switch (actionButton) {
        case 'edit':
            editItem(e);
            break; 
        case 'update':
            updateItem(e);
            break; 
        case 'remove':
            removeItem(e);
            break;
    }
});

function editItem(el) {
    const stringId = el.target.id;
    const id = stringId.replace('edit-','');

    const editButton = document.querySelector(`#edit-${id}`);
    const updateButton = document.querySelector(`#update-${id}`);

    editButton.hidden = true;
    updateButton.hidden = false;

    const itemElement = document.querySelector(`#item-${id}`);
    
    const textHolder = document.querySelector(`#textHolder-${id}`);
    textHolder.hidden = true;
    
    const inputItemElement = document.createElement('input');
    inputItemElement.classList = 'form-control';
    inputItemElement.value = textHolder.innerText;

    itemElement.appendChild(inputItemElement);
}

function updateItem(el) {
    console.log(1)
}

function removeItem(el) {
    const stringId = el.target.id;
    const id = stringId.replace('remove-','');
    const tableItemElement = document.querySelector(`#tableItem-${id}`);

    tableItemElement.remove();
    todoArray.splice(id, 1);
    localStorage.setItem('todoArray', JSON.stringify(todoArray));

    if (todoArray.length === 0) {
        showEmptyState();
    }
}

function showEmptyState() {
    emptyListElement.classList = 'text-center';
    emptyListElement.id = 'emptyDisplay';
    emptyListElement.innerHTML = `You don't have anything to do...`;
    tableBodyElement.appendChild(emptyListElement);
}