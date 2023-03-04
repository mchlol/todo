// import the modules first
import { createLiElement } from './dom.js';
import { noTasks } from './dom.js';
import './input.scss';



// ### 

const form = document.querySelector('#add-task-form');
const editForm = document.querySelector('#edit-task-form');
const list = document.querySelector('#task-list');
let tasks = [];

// every time the tasks array is changed in any way, those changes are mirrored to local storage and the new tasks are displayed.

// ## DEBUGGING FUNCTION ##
function showState() {
    console.log('calling showState()...');
    console.table('tasks', tasks);
    return console.table('localStorage tasks', JSON.parse(localStorage.getItem('tasks')));
}

// when the form is submitted (task is added):
function handleSubmit(event) {
    console.log('calling handleSubmit()..');
    console.log(event);
    // stop the 'page refresh with data in the url' behaviour
    event.preventDefault(); 

    // create the task in an object
    const task = {
        title: event.currentTarget.title.value,
        taskNotes: event.currentTarget.tasknotes.value,
        dueDate: event.currentTarget.dueDate.value,
        priority: event.currentTarget.priority.value,
        id: Date.now(),
        completed: false,
        category: checkDueDate(dueDate)
    };

    console.log('task created: ', task);
    // add the new object to the array
    tasks.push(task); 
    // log the state of the tasks array
    console.log(`No. of tasks in state: ${tasks.length}`);
    console.log('view all tasks: ', tasks);
    // clear the form inputs
    event.target.reset();
    // dispatch a custom event which calls the display function and mirror to local storage!
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}


function displayTasks() {
    console.log('calling displayTasks()...');
    showState();
    // if there are no tasks...
    if (tasks.length === 0) {
        console.log('no tasks');
        // check local storage too
        if (JSON.parse(localStorage.getItem('tasks')).length === 0) {
            console.log('no local tasks either');
            console.log('clearing list html');
            list.innerHTML = '';
            console.log('calling noTasks');
            return noTasks();
        } else {
            return console.log('the tasks array is empty but local storage is not');
        }
    } else {
        // clear all the innerHTML of the ul element
        console.log('clearing all list html');
        list.innerHTML = '';
        // loop over each item in the tasks array and call the dom module to create a list item element
        console.log('populating html from tasks array');
        const html = tasks.forEach(
        task => createLiElement(task)
        );
        return html;
    }
}

function mirrorToLocalStorage() {
    console.log('calling mirrorToLocalStorage()...');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('tasks array mirrored to local storage');
    return showState();
    };


function restoreFromLocalStorage() {
    console.log('calling restoreFromLocalStorage...');
    // get the data from local storage
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    // check if any data was found
    if (!localStorageTasks) { 
        noTasks();
        return console.log('no tasks in localStorage yet')
    } else {
        // copy the data found in localStorage to the tasks array - this is how we make that data 'persist' between sessions!
        tasks = localStorageTasks;
        // from here the display tasks will run but mirror will also run again...
        return list.dispatchEvent(new CustomEvent('tasksUpdated'));
    }
}

// find the item in the tasks array with the corresponding id from the element and remove it from the array, then call the function to display the new array. 
function deleteTask(id) {
    console.log('calling deleteTask()...');
    console.log('looking for id', id);
    // now let's check if that was the only task
    if (tasks.length === 1) {
        console.log('this is the only task');
        // the id doesnt matter, because there is only one task
        console.log('clearing tasks array');
        tasks = [];
        list.dispatchEvent(new CustomEvent('tasksUpdated'));
        console.log('deleteTask() calls showState()');
        showState();
        // there was a task, but we deleted it so now there are no tasks!
    } else {
        console.log('filtering tasks array');
        // filter the tasks to leave only those that do NOT match the id
        let filteredTasks = tasks.filter(task => task.id != id);
        console.log('filtered tasks: ', filteredTasks);
        console.log('changing the tasks array to have the contents of the filtered array instead');
        tasks = filteredTasks;
    }

    // dispatch the tasks updated event...
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}


// mark a task as complete and update its status on the page and in local storage
function markComplete(id) {
    console.log('calling markComplete()...')
    // use find() to go through the tasks array and find the first one that has an id the same as the argument
    const taskRef = tasks.find(task => task.id == id);
    console.log(taskRef);
    console.log(`Before: task completed = ${taskRef.completed}`);
    taskRef.completed = !taskRef.completed;
    console.log(`After: task completed = ${taskRef.completed}`);
    // now access the tasks array, find the task with matching id, and replace that task with taskRef
    const taskIndex = tasks.findIndex(task => task.id == id);
    console.log(taskIndex);
    tasks[taskIndex] = taskRef;
    console.log(tasks[taskIndex].completed);

    // when a task is completed, the checkbox should appear checked
    // get reference to the list item with matching id
    let element = document.getElementById(id);
    console.log(element);
    // find the input[type='checkbox'] within
    let checkbox = element.querySelector('input[type=checkbox');
    console.log(checkbox);
    // toggle the checkbox
    checkbox.checked = !checkbox.checked;
    console.log(checkbox);
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
};

function editTask(id) {
    // find the object with matching id
    // find the index
    let taskIndex = tasks.findIndex(task => task.id == id);
    console.log(taskIndex);
    // target the object with that index
    let task = tasks[taskIndex]; // now we have reference to the task object
    console.log(task);

    // target all the edit form inputs and set their values
    const titleEdit = document.querySelector('#titleEdit');
    console.log(titleEdit);
    titleEdit.value = task.title;
    const notesEdit = document.querySelector('#notesEdit');
    notesEdit.value = task.taskNotes;
    const dueDateEdit = document.querySelector('#dueDateEdit');
    dueDateEdit.value = task.dueDate;
    const priorityEdit = document.querySelector('#priorityEdit');
    priorityEdit.value = task.priority;
    // access the hidden field in the edit form 
    const hiddenField = document.querySelector('#hiddenField');
    // set its value to the task object id so we can access it from another function
    hiddenField.value = id;
    console.log(hiddenField.value);
    return console.log('Task title: ' + task.title);
}

// when the form is submitted (task is to be edited):
function handleEditSubmit(event) {
    console.log('calling handleEditSubmit()..');
    console.log(event);
    // stop the 'page refresh with data in the url' behaviour
    event.preventDefault(); 
    
    // get the ID of the task to be edited!
    // access the hidden field in the edit form 
    const hiddenField = document.querySelector('#hiddenField');
    // store its value in a variable so it can be used within this form
    let id = hiddenField.value;
    console.log(id);
    console.log(tasks);
    // get the task
    let taskIndex = tasks.findIndex(task => task.id == id);
    console.log(taskIndex);
    // target the object with that index
    let task = tasks[taskIndex]; // now we have reference to the task object
    console.log(task); // this shows the right task
    // edit the first 4 task values and category if necessary
    console.log(task.title); // this is right
    // issues start here!
    console.log(event.currentTarget); // this is the form
    // we need to access all the inputs again?
    const titleEdit = document.querySelector('#titleEdit');
    const notesEdit = document.querySelector('#notesEdit');
    const dueDateEdit = document.querySelector('#dueDateEdit');
    const priorityEdit = document.querySelector('#priorityEdit');

    task.title = titleEdit.value;
    task.taskNotes = notesEdit.value;
    task.dueDate = dueDateEdit.value;
    task.priority = priorityEdit.value;
    task.category = checkDueDate(task.dueDate);

    console.log('task edited: ', task);

    // DO NOT clear the form inputs
    // event.target.reset();

    // we DO want to close the form on submit though

    // dispatch a custom event which calls the display function and mirror to local storage!
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}

function handleClick(event) {
    console.log('running handleClick()...');
    // get the id of the closest list element
    // event.target here will be the html element clicked
    const id = event.target.closest('li').id;
    console.log('id: ', id);
    // check if the element clicked was a span
    if (event.target.matches('span')) {
        // then check if the textContent is 'mode' or 'delete'
        if (event.target.textContent === 'mode') {
            console.log('edit task');
            return editTask(id);
        } else if (event.target.textContent === 'delete') {
            return deleteTask(id);
        }
    } else if (event.target.matches('input[type=checkbox]')) {
        console.log('checkbox clicked');
        return markComplete(id);
    }
};


// ## EVENT LISTENERS ##

// when the form is submitted (a task is added), run the handleSubmit function
form.addEventListener('submit', handleSubmit);

editForm.addEventListener('submit', handleEditSubmit);

// when the tasksUpdated custom event fires:
// copy tasks to local storage
list.addEventListener('tasksUpdated', mirrorToLocalStorage);
// display tasks
list.addEventListener('tasksUpdated', displayTasks);
// OR use an anonymous function to pass an argument 
// list.addEventListener('tasksUpdated', () => { mirrorToLocalStorage(tasks) });

// when a checkbox or edit/delete icon is clicked:
list.addEventListener('click', handleClick);

restoreFromLocalStorage(tasks);


// ## modules? ## //

// check task due date
function checkDueDate(date) {
    // create a variable to hold the current date
    const today = new Date();
    // convert that value to a date string
    const todayString = today.toDateString();
    // create a variable to hold the date from the argument
    const dateInput = new Date(date);
    // convert that to a date string too
    const dateString = dateInput.toDateString();
    // create a variable to hold the return value
    let showDueDay;

    // if the date cannot be parsed e.g. there is no date input at all 
    if (!Date.parse(date)) {
        showDueDay = `Someday`;
    } 
    // if the argument is the same as todays date
    else if (todayString === dateString) {
        showDueDay = `Today`;
    } 
    // if the argument is less the todays date
    else if (Date.parse(date) < today) {
        // here should also check if the task was already completed i.e. task == completed ? 'completed' : 'today, overdue warning'
        showDueDay = `Overdue`;
    } 
    // if the date string is truthy but not today or less than todays date
    else if (dateString) {
        showDueDay = `Soon`;
    }
    else {
        showDueDay = `???`;
    }

    return showDueDay;
};


