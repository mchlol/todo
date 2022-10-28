import printMe from './print.js';
import './input.scss';



// check task category

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

// test the function for various cases
// note to self - learn testing
console.log('Today: ' + checkDueDate('2022-10-26'));
console.log('Yesterday: ' + checkDueDate('2021-10-26'));
console.log('No input: ' + checkDueDate());
console.log('Future: ' + checkDueDate('2022-10-28'));
console.log('null: ' + checkDueDate(null));
console.log('undefined: ' + checkDueDate(undefined));
console.log('random string: ' + checkDueDate('ahlfkahef'));
console.log(2 + ': ' + checkDueDate(2)); // this returns 'overdue' as 2 is less than a date 
console.log('Huge number: ' + checkDueDate(999999999999999));



// task class
let taskId = 0; // global variable for incrementing id numbers
class Task {
    constructor(title,description,dateAdded,dueDate,priority) {
        this.title = title;
        this.description = description;
        this.dateAdded = dateAdded.toDateString();
        this.dueDate = dueDate.toDateString();
        this.priority = priority;
        this.taskId = `task${++taskId}`;
    }
}

// temp args
let someTitle = 'Pack for snow trip';
let someNotes = 'make list, buy adaptor, find winter clothes, replace batteries';
let someDate = new Date();
let somePrio = 'Low';

// temp task object
const someTask = new Task(someTitle,someNotes,someDate,someDate,`${somePrio} priority`);

console.log(someTask);

/* ###
    DOM STUFF
### */

const taskList = document.querySelector('#task-list');

function displayTaskItem(object) {
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'task-item-wrapper', 'm-1', 'p-1')

    let taskPrimaryWrap = document.createElement('div');
    taskPrimaryWrap.classList.add('task-text-primary')

    // primary text elements

    let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('form-check-input', 'm-1')
    
    let title = document.createElement('span');
    title.classList.add('fw-bold', 'm-1')
    title.textContent = object.title;


    taskPrimaryWrap.appendChild(check,title);


    let taskSecondaryWrap = document.createElement('div');
    taskSecondaryWrap.classList.add('task-text-secondary', 'text-muted', 'small');

    //secondary text elements

    let notes = document.createElement('p');
    notes.classList.add('m-1','text-justify');
    notes.textContent = object.notes;


    let detailsRow = document.createElement('div');
    detailsRow.classList.add('d-flex', 'flex-wrap','justify-content-between','align-items-center');

    // date added - don't need to display this for now

    let dueDate = document.createElement('span');
    dueDate.textContent = object.dueDate;

    let priority = document.createElement('span');
    priority.textContent = object.prio + ' priority';

    let iconWrap = document.createElement('div');
    iconWrap.classList.add('d-flex');
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn','btn-sm');
    editBtn.setAttribute('id','edit');


    detailsRow.appendChild(dueDate,priority,iconWrap);

    taskSecondaryWrap.appendChild(notes);
    taskSecondaryWrap.appendChild(detailsRow);
    
    listItem.appendChild(taskPrimaryWrap);
    listItem.appendChild(taskSecondaryWrap);


    // return list item
    return taskList.appendChild(listItem);
}

displayTaskItem(someTask);

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

