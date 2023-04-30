// installed date-fns with npm
// assign formatting function to a variable 
const {format} = require('date-fns');

// import all the functions required for check due date
import isValid from 'date-fns/isValid';
import isEqual from 'date-fns/isEqual'
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore'

// ## test date fns

function dateHandler(date) {
    return format(date,'EEE dd MMM yyyy');
};

// check task due date
function checkDueDate(date) {
    // the object gets the date from a date picker which returns a string "yyyy-mm-dd"
    // Date.parse(input) converts that input into a number (of milliseconds from epoch)
    // OR new Date(input) converts the input into a date object

    // create a variable to hold the string we will return
    let showDueDate;
    // get the input date and convert it to a date object
    let input = new Date(date);
    // set the input date to midight for more accurate comparison
    input.setHours(0,0,0,0); // set time to 00:00:00 sharp
    // ### setHours on invalid date returns NaN ###

    // get todays date for comparison
    let today = new Date();
    // set the time to midnight for more accurate comparison
    today.setHours(0,0,0,0);

    if (!isValid(input)) {
        // check if the date input is NOT valid (or if no date was input) 
        showDueDate = "Someday";
    } else if (isEqual(input,today)) {
        // check if the input date and today are the same
        showDueDate = "Today";
    } else if (isBefore(input,today)) {
        // check if the input date is before today's date
        showDueDate = "Overdue";
    } else if (isAfter(input,today)) {
        // check if the input date is in the future
        showDueDate = "Soon";
    } else {
        // edge case in case something went wrong
        showDueDate = "???";
    }
    return showDueDate;


    // compare to todays date - day, month, and year only not time
    // getDay() will return the day of the week as a number
    // getDate() will return the day of the month
    // getMonth() returns the month of the year as a number (0 based so 0 is Jan, 1 is Feb etc)
    // getFullYear() returns the year as a four digit number (getYear() is deprecated)

    // if there is no date input at all / date is invalid "Someday"
    // ### setHours on invalid date returns NaN ###
    // if the input is the same as todays date "Today"
    // if the input is the day after todays date "Tomorrow"
    // if the input is less than todays date "Overdue"
    // if the date input is after todays date "Soon"

    // convert the input to a date object
};


const taskList = document.querySelector('#task-list');

function createLiElement(task) {
    // create the elements and add class names and attributes where required
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'task-item-wrapper', 'p-2')
    listItem.setAttribute('id', task.id);

    let taskPrimaryWrap = document.createElement('div');
    taskPrimaryWrap.classList.add('task-text-primary')
    
    let title = document.createElement('span');
    title.classList.add('fw-bold', 'm-1')
    title.textContent = task.title;

    let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('form-check-input', 'm-1')
    if (task.completed) {
        title.style.textDecoration = 'line-through';
        check.checked = true;
    };

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
    }  else {
        let parsedDate = Date.parse(task.dueDate);
        dueDate.textContent = dateHandler(parsedDate);
    }

    let category = document.createElement('span');
    category.classList.add('small', 'm-1');
    task.category = checkDueDate(task.dueDate);
    category.textContent = task.category;

    let priority = document.createElement('span');
    priority.classList.add('small','m-1');
    if (task.priority == 1) {
        priority.classList.add('text-danger');
        priority.textContent = 'High priority';
    } else if (task.priority == 2) {
        priority.classList.add('text-warning');
        priority.textContent = 'Medium priority';
    } else if (task.priority == 3) {
        priority.classList.add('text-success');
        priority.textContent = 'Low priority';
    } 
    

    let iconWrap = document.createElement('div');
    iconWrap.classList.add('d-flex');

    let editBtn = document.createElement('button');
    editBtn.classList.add('btn','btn-sm');
    editBtn.setAttribute('id','edit');
    editBtn.setAttribute('data-bs-toggle','modal');
    editBtn.setAttribute('data-bs-target','#editTaskModal');
    editBtn.innerHTML = `<span class="material-icons text-primary">mode</span>`;

    let delBtn = document.createElement('button');
    delBtn.classList.add('btn','btn-sm');
    delBtn.setAttribute('id','delete');
    delBtn.innerHTML = `<span class="material-icons text-danger">delete</span>`;

    // append the elements
    iconWrap.append(editBtn,delBtn);
    detailsRow.append(dueDate,category,priority,iconWrap);
    taskSecondaryWrap.append(notes,detailsRow);
    taskPrimaryWrap.append(check,title)
    listItem.append(taskPrimaryWrap,taskSecondaryWrap);

    // return the final li element appended to the ul element?
    return taskList.appendChild(listItem);
}

function noTasks() {
    let div = document.createElement('div');
    div.textContent = `No tasks yet! Add a new task, or create a project.`;
    return taskList.appendChild(div);
}

// changes the page header based on the project passed in
function changeProjectHeader(project) {
    let header = document.querySelector('#projectHeader');
    return header.textContent = project.title;
}

// returns the title currently displayed in the page header
function checkActiveProject() {
    let header = document.querySelector('#projectHeader');
    let headerContent = header.textContent;
    console.log(headerContent);
    return headerContent;
}

function projectTitles() {
    // get the select element from the add task form
    const addTaskForm = document.querySelector('#add-task-form');
    let addTaskFormSelect = addTaskForm.querySelector('#projectSelect');
    let projectMenu = document.querySelector('#projectMenu');
    // get the array of projects from local storage
    let projects = JSON.parse(localStorage.getItem('projects'));

    // for each project; create an options element, add its title to the add task form select
    projects.forEach(project => {
        let projectOption = document.createElement('option');
        projectOption.value = project.title;
        projectOption.textContent = project.title;
        addTaskFormSelect.appendChild(projectOption);
        let projectListItem = document.createElement('li');
        projectListItem.textContent = project.title;
        projectListItem.classList.add('dropdown-item');
        projectMenu.appendChild(projectListItem);
    })
    // should this function return something?
    // is it bad design to have this one function do two DOM things?
 };

export {
    createLiElement,
    noTasks,
    changeProjectHeader,
    checkActiveProject,
    projectTitles,
};