function testDom() {
console.log('called from dom.js');
};

const taskList = document.querySelector('#task-list');

function displayTaskItem(object) {

    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'task-item-wrapper', 'p-1')

    let taskPrimaryWrap = document.createElement('div');
    taskPrimaryWrap.classList.add('task-text-primary')

    // primary text elements

    let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('form-check-input', 'm-1')
    
    let title = document.createElement('span');
    title.classList.add('fw-bold', 'm-1')
    title.textContent = object.title;


    let taskSecondaryWrap = document.createElement('div');
    taskSecondaryWrap.classList.add('task-text-secondary', 'text-muted', 'small');

    //secondary text elements

    let notes = document.createElement('p');
    notes.classList.add('m-1','text-justify');
    notes.textContent = object.notes;

    let detailsRow = document.createElement('div');
    detailsRow.classList.add('d-flex', 'flex-wrap','justify-content-between','align-items-center');

    let dueDate = document.createElement('span');
    dueDate.classList.add('small','m-1');
    if (!object.dueDate) {
        dueDate.textContent = 'No due date';
    }  else dueDate.textContent = `Due ${object.dueDate}`;

    let priority = document.createElement('span');
    priority.classList.add('small','m-1');
    priority.textContent = object.priority + ' priority';

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


    // return list item
    return taskList.appendChild(listItem);
}

export {
    testDom,
    displayTaskItem
};