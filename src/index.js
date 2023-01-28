// import the modules first
import { createLiElement } from './dom.js';
import './input.scss';

// access form 
const form = document.querySelector('#add-task-form');

// access ul for displaying tasks
const list = document.querySelector('#task-list');

// create an array to hold task objects
let tasks = [];


function handleSubmit(event) {
    // stop the 'page refresh with data in the url' behaviour
    event.preventDefault(); 

    console.log('form submitted');

    // create the task in an object
    // first get the data from the form inputs *** CAN THIS BE SHORTER?
    const title = event.currentTarget.title.value;
    const taskNotes = event.currentTarget.tasknotes.value;
    const dueDate = event.currentTarget.dueDate.value;
    const priority = event.currentTarget.priority.value;
    // create the task object from above data
    const task = {
        title,
        taskNotes,
        dueDate,
        priority,
        id: Date.now(),
        completed: false,
        // havent added category yet
    };
    // add the new object to the array
    tasks.push(task); 
    // log the state of the tasks array
    console.log(tasks);
    console.log(`No. of tasks in state: ${tasks.length}`);
    // clear the form inputs
    event.target.reset();
    // dispatch a custom event to the list element to say the tasks array state has changed
    list.dispatchEvent(new CustomEvent('tasksUpdated'));
}


function displayTasks() {
    console.log('displaying current tasks array: ', tasks);
    // clear all the innerHTML of the ul element
    list.innerHTML = '';
    // create a variable called html which will loop over each item in the tasks array and run the DOM function exported from the dom.js module.
    const html = tasks.forEach(
        task => createLiElement(task)
    );
    return html;
}

// every time the tasks array is changed in any way, those changes must be mirrored to local storage.
// if the tasks array is empty, don't do anything with local storage as it wipes any data already stored there

function mirrorToLocalStorage() {
    // access the key 'tasks' in localStorage and overwrite it with the tasks array (converted to a string) 
    if (!tasks) {
        return console.log('nothing in tasks array');
    } else {
        console.log('task mirrored to localStorage');
        return localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function restoreFromLocalStorage() {
    console.log('retrieving tasks from local storage...');
    // create a variable and assign it the contents of the local storage 'tasks' key (converted back to an array of objects)
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));

    if (localStorageTasks) { 
        // check if its truthy (contains data), if so assign the data from localStorage to the tasks array
        tasks = localStorageTasks;
        // the list element dispatches the tasksUpdated event - but it also listens for this same event?
        list.dispatchEvent(new CustomEvent('tasksUpdated'));
    } else {
        console.log('no tasks in localStorage yet')
    }
}

// find the item in the tasks array with the corresponding id from the element and remove it from the array, then call the function to display the new array. 
function deleteTask(id) {
    console.log('deleting task', id);
    // filter the tasks to leave only those that do NOT match the id
    let filteredTasks = tasks.filter(task => task.id !== id);
    console.log(filteredTasks);
    // log the new array
    tasks = filteredTasks;
    console.log(tasks);
    // dispatch the tasks updated event...
    list.dispatchEvent(new CustomEvent('tasksUpdated'));
}

function markComplete(id) {
    console.log(`changed task ${id} complete status`);
    // use find() to go through the tasks array and find the first one that has an id the same as the argument
    const taskRef = tasks.find(task => task.id === id);
    // taskRef.completed = !taskRef.completed;
    console.log(taskRef);
    list.dispatchEvent(new CustomEvent('tasksUpdated'));
};


// ## EVENT LISTENERS ##

// when the form is submitted (a task is added), run the handleSubmit function
form.addEventListener('submit', handleSubmit);

// when the tasksUpdated custom event fires, then run the displayTasks function
list.addEventListener('tasksUpdated', displayTasks);

// as above but with anonymous function so we can pass an argument to the mirrorToLocalStorage function
// list.addEventListener('tasksUpdated', () => { mirrorToLocalStorage(tasks) });
list.addEventListener('tasksUpdated', mirrorToLocalStorage());

list.addEventListener('click', function(event) {
    // get the id of the closest list element, hold it in a variable
    const id = event.target.closest('li').id;
    console.log('id: ', id);
    // check if the element clicked was a span
    if (event.target.matches('span')) {
        // if it is, check if the nearest parent is a button with the id 'delete' (so we can add edit later)
        console.log('span clicked');
        if (event.target.closest('button')) {
            // if true call the delete function with the id
            deleteTask(id);
        }
    } else if (event.target.matches('input[type=checkbox]')) {
        console.log('checkbox clicked');
        markComplete(id);
    }
});

restoreFromLocalStorage(tasks);


// ## modules? ## //

// check task due date
// could be a module
const checkDueDate = (date) => {
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

    // if the argument is the same as todays date
    if (todayString === dateString) {
        showDueDay = `Today`;
    } 
    // if the argument is less the todays date
    else if (Date.parse(date) < today) {
        // here should also check if the task was already completed i.e. task == completed ? 'completed' : 'today, overdue warning'
        showDueDay = `Overdue`;
    } 
    // if the date cannot be parsed e.g. there is no date input at all 
    else if (!Date.parse(date)) {
        showDueDay = `Someday`;
    } 
    // if the date string is truthy but not today or less than todays date
    else if (dateString) {
        showDueDay = `Soon`;
    }

    return showDueDay;
};


// convert date to human readable format
// could be a module
const dateHandler = (date) => {
    let dayOfWeek = date.getDay();
    let dayOfMonth = date.getDate();
    let month = date.getMonth();
    let year = date.getYear();
    let string = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
    return string;
}

    // task class
    // could creating a task also be a module?
    // class Task {
    //     constructor(title,notes,dueDate,priority,category) {
    //     this.title = title;
    //     this.notes = notes;
    //     this.dueDate = dueDate;
    //     this.priority = priority;
    //     this.taskId = Date.now();
    //     this.section = checkDueDate(dueDate); // check name if module
    //     this.category = category; // ie 'tasks' or 'projectName'
    //     }
    // };

/* TO DO:
default view is today
user can change view to soon, someday, or completed
user clicks button to add task
modal window opens
user inputs info into the form
on submit the form data is stored as an object
task objects are kept in localstorage
user can categorise tasks
if dueDate is today it goes into today tasklist
if dueDate exists but is not today it goes into soon tasklist
if no dueDate exists it goes into someday tasklist
user can edit all task info
user can delete a task
user can 'check' off a task
  when checked a task is moved eg from 'today' to 'completed'
when task is added it appears in the list
ordered by priority, then date added
*/
