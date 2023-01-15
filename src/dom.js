const taskList = document.querySelector('#task-list');

function createLiElement(task) {

    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'task-item-wrapper', 'p-1')
    listItem.setAttribute('id', task.id);

    let taskPrimaryWrap = document.createElement('div');
    taskPrimaryWrap.classList.add('task-text-primary')

    let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('form-check-input', 'm-1')
    
    let title = document.createElement('span');
    title.classList.add('fw-bold', 'm-1')
    title.textContent = task.title;

    let taskSecondaryWrap = document.createElement('div');
    taskSecondaryWrap.classList.add('task-text-secondary', 'text-muted', 'small');

    let notes = document.createElement('p');
    notes.classList.add('m-1','text-justify');
    notes.textContent = task.taskNotes;

    let detailsRow = document.createElement('div');
    detailsRow.classList.add('d-flex', 'flex-wrap','justify-content-between','align-items-center');

    let dueDate = document.createElement('span');
    dueDate.classList.add('small','m-1');
    if (!task.dueDate) {
        dueDate.textContent = 'No due date';
    }  else dueDate.textContent = `Due ${task.dueDate}`;

    let priority = document.createElement('span');
    priority.classList.add('small','m-1');
    priority.textContent = task.priority + ' priority';

    let iconWrap = document.createElement('div');
    iconWrap.classList.add('d-flex');

    let editBtn = document.createElement('button');
    editBtn.classList.add('btn','btn-sm');
    editBtn.setAttribute('id','edit');
    editBtn.innerHTML = `<span class="material-icons text-primary">mode</span>`;

    let delBtn = document.createElement('button');
    delBtn.classList.add('btn','btn-sm');
    delBtn.setAttribute('id','delete');
    delBtn.innerHTML = `<span class="material-icons text-danger">delete</span>`;
    // delBtn.addEventListener('click', deleteItem);

    // append the elements
    iconWrap.appendChild(editBtn);
    iconWrap.appendChild(delBtn);

    detailsRow.appendChild(dueDate);
    detailsRow.appendChild(priority)
    detailsRow.appendChild(iconWrap);

    taskSecondaryWrap.appendChild(notes);
    taskSecondaryWrap.appendChild(detailsRow);

    taskPrimaryWrap.appendChild(check)
    taskPrimaryWrap.appendChild(title);
    
    listItem.appendChild(taskPrimaryWrap);
    listItem.appendChild(taskSecondaryWrap);

    return taskList.appendChild(listItem);
}

// from shopping list:
// function deleteItem(btn) {
//     let element = btn.target.parentNode;
//     const index = [...element.parentElement.children].indexOf(element);
//     itemStorage.splice(index, 1);
//     localStorage.setItem('items', JSON.stringify(itemStorage));
//     element.remove();
//   };


export {
    createLiElement
};