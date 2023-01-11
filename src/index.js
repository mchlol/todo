// import the modules first
import { displayTaskList } from './dom.js';
import { store } from './store.js';
import './input.scss';

// access form 
// access form inputs by their name eg. form.notes.value
const form = document.querySelector('#add-task-form');

// access ul for displaying tasks
const list = document.querySelector('#task-list');

// create an array to hold task objects
let tasks = [];


/* this function will:
    create a task object from the form data
    add the task to the tasks array
    clear the form
    let the list element know the state has changed - it will be listening
*/ 
function handleSubmit(event) {
    event.preventDefault(); // stop the 'page refresh with data in the url' behaviour
    console.log('form submitted');

    // create the task in an object
    // first get the data from the form inputs
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
    console.log(tasks);
    console.log(`No. of tasks in state: ${tasks.length}`);
    // clear the form inputs
    event.target.reset();
    // dispatch a custom event to the list element to say the tasks array state has changed
    list.dispatchEvent(new CustomEvent('tasksUpdated'));
}


function displayTasks() {
    console.log(tasks);
    const html = tasks.map(
        task => `
        <li>
        ${task.title}
        </li>
        `
    );
    list.innerHTML = html;
}

function mirrorToLocalStorage() {
    console.log('task saved to localStorage');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(localStorage.getItem('tasks'));
}

function restoreFromLocalStorage() {
    console.log('retrieving tasks from local storage...');
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    if (localStorageTasks.length) { // this logs an error if there's nothing in storage yet
        tasks = localStorageTasks;
        list.dispatchEvent(new CustomEvent('tasksUpdated'));
    }
}



form.addEventListener('submit', handleSubmit);
list.addEventListener('tasksUpdated', displayTasks);
list.addEventListener('tasksUpdated', mirrorToLocalStorage);

restoreFromLocalStorage();


// ## modules? ## //

// check task due date
// this could go in a module
const checkDueDate = (date) => {
    const today = new Date();
    const todayString = today.toDateString();
    const dateInput = new Date(date);
    const dateString = dateInput.toDateString();

    if (todayString === dateString) {
        return `Today`;
    } 
    else if (Date.parse(date) < today) {
        // task == completed ? 'completed' : 'today, overdue warning'
        return `Overdue`;
    } 
    else if (!Date.parse(date)) {
        return `Someday`;
    } 
    else if (dateString) {
        return `Soon`;
    }
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

/*
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
