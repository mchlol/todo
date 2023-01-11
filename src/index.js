// import the modules first
import { displayTaskList } from './dom.js';
import { store } from './store.js';
import './input.scss';

store();

// create an array to hold task objects
let tasks = [];

// access form 
// access form inputs by their name eg. form.notes.value
const form = document.querySelector('#add-task-form');

// access ul for displaying tasks
const list = document.querySelector('#task-list');

// this function will create a task from the form data
// then add the task to the tasks array
// 
function handleSubmit(event) {
    e.preventDefault(); // stop the 'page refresh with data in the url' behaviour
    console.log('form submitted');

    // create the task in an object
    // first get the data from the form inputs
    const title = e.currentTarget.title.value;
    const taskNotes = e.currentTarget.tasknotes.value;
    const dueDate = e.currentTarget.dueDate.value;
    const priority = e.currentTarget.priority.value;
    // create the task object from above data
    const task = {
        title,
        taskNotes,
        dueDate,
        priority,
        id: Date.now(),
        completed: false,
        // havent added category yet
    }
    // add the new object to the array
    tasks.push(task); 
    console.log(`No. of tasks in state: ${tasks.length}`);
    // clear the form inputs
    e.target.reset();
    // dispatch a custom event to say the tasks array state has changed
    list.dispatchEvent(new CustomEvent('tasksUpdated'));

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
}

// ## original code here ## //

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



// we can call this with a custom event
// this data should be called from local storage
displayTaskList(tasks);
// on creating a task it should be pushed to the variable in  localStorage


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
