/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/input.scss":
/*!************************!*\
  !*** ./src/input.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLiElement": () => (/* binding */ createLiElement)
/* harmony export */ });
const taskList = document.querySelector('#task-list');

function createLiElement(task) {
    // create the elements and add class names and attributes where required
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

    // return the final li element appended to the ul element?
    return taskList.appendChild(listItem);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _input_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.scss */ "./src/input.scss");
// import the modules first



const form = document.querySelector('#add-task-form');
const list = document.querySelector('#task-list');
let tasks = [];

// every time the tasks array is changed in any way, those changes are mirrored to local storage and the new tasks are displayed.

// ## DEBUGGING FUNCTION ##
function showState() {
    console.log('calling showState()...');
    console.table('tasks', tasks);
    console.table('localStorage tasks', JSON.parse(localStorage.getItem('tasks')));
}

// when the form is submitted (task is added):
function handleSubmit(event) {
    console.log('calling handleSubmit()..');
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
        // to do: assign task category
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
    console.log('calling displayTasks()...');
    showState();
    // clear all the innerHTML of the ul element
    console.log('clearing list html');
    list.innerHTML = '';
    // create a variable called html which will loop over each item in the tasks array and run the DOM function exported from the dom.js module.
    console.log('repopulating list from tasks array');
    const html = tasks.forEach(
        task => (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.createLiElement)(task)
    );
    return html;
}


// if the tasks array is empty, don't do anything with local storage as it wipes any data already stored there
// ## this means if we delete the ONLY task, local storage won't update!!
// could work with on page load???
function mirrorToLocalStorage() {
    console.log('calling mirrorToLocalStorage()...');
    if (!tasks[0]) {
        // if the tasks array is empty do nothing
        return console.log('nothing in tasks array');
    } else {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('tasks array mirrored to local storage');
        // access the key 'tasks' in localStorage and overwrite it with the tasks array (converted to a string) 
        showState();
    }
}

function restoreFromLocalStorage() {
    console.log('calling restoreFromLocalStorage...');
    // create a variable and assign it the contents of the local storage 'tasks' key (converted back to an array of objects)
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));

    if (!localStorageTasks) { 
        // if this variable is falsy;
        console.log('no tasks in localStorage yet')
    } else {
        // assign the data from localStorage to the tasks array
        tasks = localStorageTasks;
        list.dispatchEvent(new CustomEvent('tasksUpdated'));
    }
}

// find the item in the tasks array with the corresponding id from the element and remove it from the array, then call the function to display the new array. 
function deleteTask(id) {
    console.log('calling deleteTask()...');
    console.log('looking for id', id);
    // filter the tasks to leave only those that do NOT match the id
    console.log('filtering tasks array');
    let filteredTasks = tasks.filter(task => task.id != id);
    console.log('filtered tasks: ', filteredTasks);
    console.log('changing the tasks array to have the contented of the filtered array instead');
    tasks = filteredTasks;
    showState();
    // dispatch the tasks updated event...
    list.dispatchEvent(new CustomEvent('tasksUpdated'));
}


// mark a task as complete and update its status on the page and in local storage
function markComplete(id) {
    console.log('calling markComplete()...')
    console.log(`changed task ${id} complete status`);
    // use find() to go through the tasks array and find the first one that has an id the same as the argument
    const taskRef = tasks.find(task => task.id === id);
    // taskRef.completed = !taskRef.completed;
    console.log(taskRef);
    list.dispatchEvent(new CustomEvent('tasksUpdated'));
};

function handleClick(event) {
    console.log('running handleClick()...');
    // get the id of the closest list element
    const id = event.target.closest('li').id;
    console.log('id: ', id);
    // check if the element clicked was a span
    if (event.target.matches('span')) {
        // if it is, check if the nearest parent is a button with the id 'delete' (so we can add edit later)
        console.log('span clicked');
        if (event.target.closest('button')) {
            // if true call the delete function with the id
            console.log('closest element is a button');
            deleteTask(id);
        }
    } else if (event.target.matches('input[type=checkbox]')) {
        console.log('checkbox clicked');
        markComplete(id);
    }
};


// ## EVENT LISTENERS ##

// when the form is submitted (a task is added), run the handleSubmit function
form.addEventListener('submit', handleSubmit);

// when the tasksUpdated custom event fires:
// display tasks
list.addEventListener('tasksUpdated', displayTasks);
// and copy them to local storage
list.addEventListener('tasksUpdated', mirrorToLocalStorage);
// OR use an anonymous function to pass an argument 
// list.addEventListener('tasksUpdated', () => { mirrorToLocalStorage(tasks) });

// when a checkbox or edit/delete icon is clicked:
list.addEventListener('click', handleClick);

restoreFromLocalStorage(tasks);


// ## modules? ## //

// check task due date
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

})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map