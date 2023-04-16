// import the modules first
import { createLiElement, projectHeader } from './dom.js';
import { noTasks } from './dom.js';
import { create } from './create.js';
import './input.scss';

create();
 
const form = document.querySelector('#add-task-form');
const editForm = document.querySelector('#edit-task-form');
const list = document.querySelector('#task-list');
let tasks = []; // we wont need this anymore

// create a dummy task as an example
let defaultTask = {
    title: "Wash dishes",
    taskNotes: "Empty dishwasher",
    dueDate: "2023-04-16",
    priority: "Medium",
    id: 1681602708492,
    completed: false,
    project: "Daily tasks",
};

let projects = [ // initialise with one project that's where our default tasks will go
    {
        title: "Daily Tasks",
        description: "Daily tasks",
        tasks: [defaultTask],
    },
];



// every time the tasks - now projects - array is changed in any way, those changes are mirrored to local storage and the new tasks are displayed.

// ## DEBUGGING FUNCTION ##
function showState() {
    console.log('calling showState()...');
    console.table('tasks', tasks);
    return console.table('localStorage tasks', JSON.parse(localStorage.getItem('tasks')));
}

// handle ADD TASK form submit
function handleAddTaskSubmit(event) {
    console.log('calling handleAddTaskSubmit()..');
    console.log(event);
    event.preventDefault(); 

    // create the task in an object
    // change this to take in properties from a local storage item and pass them as args to a CONSTRUCTOR function
    const task = {
        title: event.currentTarget.title.value,
        taskNotes: event.currentTarget.tasknotes.value,
        dueDate: event.currentTarget.dueDate.value,
        priority: event.currentTarget.priority.value,
        id: Date.now(),
        completed: false,
        category: "",
        project: "", // this will be assigned in the form select element, not input as text by the user
    };

    // we need to do some handling here based on the selected project

    console.log('task created: ', task);
    // add the new object to the specified projects array
    tasks.push(task); 
    // log the state of the tasks array
    console.log(`No. of tasks in state: ${tasks.length}`);
    console.log('view all tasks: ', tasks);
    // clear the form inputs
    event.target.reset();
    // dispatch a custom event which calls the display function and mirror to local storage!
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}

// handle ADD PROJECT form submit
function handleAddProjectSubmit(event) {
    event.preventDefault();
    // create the project as an object which will have an empty array  
    const project = {
        title: event.currentTarget.projectTitle.value,
        description: event.currentTarget.projectDescription.value,
        tasks: [],
    };
    projects.push(project);
    event.target.reset();

    // we can move this into a module later but for now lets get it to work: target the select element in the add task form 
    let addTaskFormSelect = document.querySelector('#projectSelect');
    console.log(addTaskFormSelect);
    // and put our project titles in the option elements.
    let projectOption = document.createElement('option');
    projectOption.value = project.title;
    projectOption.textContent = project.title;
    addTaskFormSelect.appendChild(projectOption);
    // does option.value need to be camelCase?

    /* 
    <option value="projectTitle">textContent = projectTitle</option>
    */
    return console.log(projects);
}


function displayTasks() {
    console.log('calling displayTasks()...');
    showState();
    // first lets change the header
    // projectHeader(projectTitle) - arg should be the currently viewed project title - how to access this?

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
        console.log('populating html from local storage tasks array');
        const html = JSON.parse(localStorage.getItem('tasks')).forEach(
        task => createLiElement(task)
        );
        return html;
    }
}

function mirrorToLocalStorage() {
    // tasks should be stored in separate category arrays 
    console.log('calling mirrorToLocalStorage()...');
    // sort the tasks before storing them
    let sortedTasks = sortTasks(tasks);
    localStorage.setItem('tasks', JSON.stringify(sortedTasks));
    console.log('tasks array mirrored to local storage');
    console.log(sortedTasks);
    return showState();
    };

function mirrorProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
    return console.log('project added to storage');
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
    task.category = "";

    console.log('task edited: ', task);

    // DO NOT clear the form inputs
    // event.target.reset();

    // we DO want to close the form on submit though

    // dispatch a custom event which calls the display function and mirror to local storage!
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}

// this function listens for a click on any edit or delete button, or a checkbox
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

// when the form is submitted (a task is added), run the handleAddTaskSubmit function
form.addEventListener('submit', handleAddTaskSubmit);

editForm.addEventListener('submit', handleEditSubmit);

addProjectForm.addEventListener('submit', handleAddProjectSubmit);

// when the tasksUpdated custom event fires:
// copy tasks to local storage
list.addEventListener('tasksUpdated', mirrorToLocalStorage);
list.addEventListener('tasksUpdated', mirrorProjectsToLocalStorage);
// display tasks
list.addEventListener('tasksUpdated', displayTasks);
// OR use an anonymous function to pass an argument 
// list.addEventListener('tasksUpdated', () => { mirrorToLocalStorage(tasks) });

// when a checkbox or edit/delete icon is clicked:
list.addEventListener('click', handleClick);

restoreFromLocalStorage(tasks);

// could be a module
function sortTasks(array) {
    // for testing purposes, make a deep copy of the array so we don't affect the original by changing any references
    let arrayCopy = JSON.parse(JSON.stringify(array));
    // sort the array 
    // high priority should be the higher value - we can change this from a string to a number which displays as a string
    arrayCopy.sort( (a, b) => (a.priority > b.priority) ? 1: (a.priority === b.priority) ? ( (a.dueDate > b.dueDate) ? 1 : -1) : -1 );
    // sort in this order - high priority, medium priority, low priority
    console.log(arrayCopy);
    return arrayCopy;
}



