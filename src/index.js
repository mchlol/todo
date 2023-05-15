// import dom functions
import { createLiElement, noTasks, changeProjectHeader, checkActiveProject, addProjectTitlesToDOM } from './dom.js';
// import classes
import { Task, Project } from './create.js';
import './input.scss';



// set variables for the forms and the list in the display container
const addTaskForm = document.querySelector('#add-task-form');
const editForm = document.querySelector('#edit-task-form');
const addProjectForm = document.querySelector('#addProjectForm');
const list = document.querySelector('#task-list');

let tasks = []; // we wont need this anymore as we'll use daily tasks array in projects array

// create a dummy task as an example
let testTaskClass = new Task("Vacuum","upstairs and downstairs","2023-04-25","Low","general");

let projects = [ // initialise with one project that's where our default tasks will go
    {
        title: "General tasks",
        description: "Life admin etc.",
        // could create a keyword using a camelCase function? eg "Daily Tasks" becomes "dailyTasks"
        tasks: [testTaskClass],
    },
];


// handle ADD TASK form submit
function handleAddTaskSubmit(event) {
    event.preventDefault(); 

    const task = new Task(
        event.currentTarget.title.value,
        event.currentTarget.tasknotes.value,
        event.currentTarget.dueDate.value,
        event.currentTarget.priority.value,
        event.currentTarget.project.value // sets the project property
        );

    let projectIndex = getProjectIndex(task.project); 

    projects[projectIndex].tasks.push(task); 

    event.target.reset();
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}

// handle ADD PROJECT form submit

// when we add a project, the project object is created 
// the project object is added to local storage under the projects key
// the project title is added to the add task form select options
// the project title is added to the navbar drop up menu

function handleAddProjectSubmit(event) {
    event.preventDefault();

    const project = new Project(
        event.currentTarget.projectTitle.value,
        event.currentTarget.projectDescription.value,
    );

    projects.push(project);
    event.target.reset();
    
    console.table(projects);

    return list.dispatchEvent(new CustomEvent('tasks updated'));
}

// ## could these two checking function be a module?

// get the project by its title
const getProject = function(title) {
    let projectsInStorage = JSON.parse(localStorage.getItem('projects'));
    const match = projectsInStorage.find(project => project.title === title);
    return match;
    }

// get the index of a project with a specified title
const getProjectIndex = function(title) {
    let projectsInStorage = JSON.parse(localStorage.getItem('projects'));
    const index = projectsInStorage.findIndex(project => project.title ===title);
    return index;
}

// display tasks when the page is loaded, or the user selects a project from the drop up menu in the nav bar
function displayTasks() {
    console.log('calling displayTasks...')

    // set the active project to default project ## FOR NOW ##
    const activeProject = getProject('General tasks'); // retrieve from local storage
    console.log(activeProject);
    changeProjectHeader(activeProject); 
    // get the project by its title and look at its tasks array
    console.table(activeProject.tasks);
    console.log(getProjectIndex(activeProject.title));

    // if there are no tasks in the active project
    if (activeProject.tasks.length === 0) {
        console.log('no tasks');
        list.innerHTML = '';
        return noTasks();
    } else {
        list.innerHTML = ''; 
        console.log(activeProject.tasks);
        const html = activeProject.tasks.forEach(task => createLiElement(task));
        console.table(html);
        return html;
    }
}

// copy the state of the tasks array to local storage
function mirrorToLocalStorage() {
    // tasks should be stored in separate category arrays 
    // sort the tasks
    let sortedTasks = sortTasks(tasks);
    // ... THEN store them in localStorage under a key called 'tasks'...
    localStorage.setItem('tasks', JSON.stringify(sortedTasks));
    console.log('tasks array mirrored to local storage');
    // returning the list of SORTED tasks
    return list.dispatchEvent(new CustomEvent('tasks updated'));
    };

    // copy the state of the projects array to local storage
function mirrorProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log('project added to storage');
    return list.dispatchEvent(new CustomEvent('tasks updated'));
};

 // get the data from local storage
function restoreFromLocalStorage() {
    let activeProject = checkActiveProject();
    console.log('active project: ' + activeProject);
    let localStorageTasks = JSON.parse(localStorage.getItem('projects'));
    // check if any data was found
    if (!localStorageTasks) { 
        // if the localStorageTasks variable is falsy it's empty
        console.log('no tasks in localStorage yet');
        return noTasks();
    } else {
        // if there is no data
        const localStorageTasks = JSON.parse(localStorage.getItem('projects'));
        console.log(localStorageTasks);
        return list.dispatchEvent(new CustomEvent('tasksUpdated'));
    };
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

    // target all the edit form inputs and set their values based on the task being edited
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

addTaskForm.addEventListener('submit', handleAddTaskSubmit);
editForm.addEventListener('submit', handleEditSubmit);
addProjectForm.addEventListener('submit', handleAddProjectSubmit);

// when the tasksUpdated custom event fires:
// copy tasks to local storage
list.addEventListener('tasksUpdated', mirrorToLocalStorage);
list.addEventListener('tasksUpdated', mirrorProjectsToLocalStorage);
// call the display tasks function
list.addEventListener('tasksUpdated', displayTasks);
// add any new project titles to the DOM
// list.addEventListener('tasksUpdated', addProjectTitlesToDOM);

// when a checkbox or edit/delete icon is clicked:
list.addEventListener('click', handleClick);



// ## FINAL FUNCTION CALLS
// populate the list...
mirrorProjectsToLocalStorage();
restoreFromLocalStorage();
// add the titles of the projects in state to the drop up menu and add task form select options
addProjectTitlesToDOM(projects); // not from local storage



// could be a module
function sortTasks(array) {
    // for testing purposes, make a deep copy of the array by converting it to JSON and back - this is so we don't mutate the original array
    let arrayCopy = JSON.parse(JSON.stringify(array));
    // sort the array 
    // high priority should be the higher value - we can change this from a string to a number which displays as a string
    arrayCopy.sort( (a, b) => (a.priority > b.priority) ? 1: (a.priority === b.priority) ? ( (a.dueDate > b.dueDate) ? 1 : -1) : -1 );
    // sort in this order - high priority, medium priority, low priority
    console.log(arrayCopy);
    return arrayCopy;
}
