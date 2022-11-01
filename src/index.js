import { displayTaskList } from './dom.js';
import './input.scss';


// check task category
// everything doesn't need to be a module, right?
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

// global variable for incrementing id numbers
let taskId = 0;

// convert date to human readable format
const dateHandler = (date) => {
    let dayOfWeek = date.getDay();
    let dayOfMonth = date.getDate();
    let month = date.getMonth();
    let year = date.getYear();
    let string = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
    return string;
}

// task class
class Task {
    constructor(title,notes,dueDate,priority,category) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.taskId = `task${++taskId}`;
        this.section = checkDueDate(dueDate);
        this.category = category; // ie 'tasks' or 'projectName'
    }
};

// ## TEMPORARY TESTING STUFF ##

// temp args
let someTitle = 'Lorem ipsum dolor sit amet, consectetuer adipiscin';
let someNotes = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.';
let someDate = new Date();
// above date is always current
let somePrio = 'Medium';
let someCat = 'tasks';

// create a temp task object
const someTask = new Task(someTitle,someNotes,someDate,somePrio,someCat);
// log the temp object
console.log(someTask);
// test the function from module with temp object


// (╯°□°）╯︵ ┻━┻ 

// create an array to hold task objects
let tasks = [someTask];
// OR
let taskStorage = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// access form 
const addTaskForm = document.querySelector('#add-task-form');

// access form inputs
let title = document.querySelector('#title');
let notes = document.querySelector('#tasknotes');
let dueDate = document.querySelector('#dueDate');
let priority = document.querySelector('#priority');
// let formSubmitBtn = document.querySelector('#save-btn');

// form handler
addTaskForm.onsubmit = (e) => {
    e.preventDefault();
    let createTask = new Task(title.value,notes.value,dueDate.value,priority.value);
    console.log(createTask);
    tasks.push(createTask);
    addTaskForm.reset();
    return displayTaskList(tasks);
};

displayTaskList(tasks);

// const addTaskForm = console.log('#add-task-form');
// addTaskForm.onsubmit = function(e) {
//     e.preventDefault();
//     title = title.value;
//     notes = inputNotes.value;
//     dueDate = inputDueDate.value;
//     priority = inputPriority.value;
//     let createTask = new Task(title,notes,dueDate,priority);
//     tasks.unshift(createTask);
//     form.reset;
//     return displayTaskItem(task);
// }


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
