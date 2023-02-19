# To do list - WIP

Time to tackle the ol' to do list app. 
This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) curriculum.  

## Technologies & tools

- Figma
- HTML
- JavaScript (vanilla)
- Bootstrap
- Sass
- Webpack
- Git
- ESLint
- Prettier
- [Material icons](https://fonts.google.com/icons)

## Project set up

### Scaffolding

Linked Bootstrap via the CDN.  
Followed the [webpack project set up tutorial](https://webpack.js.org/guides/getting-started/) again  
Added sass and mini css extract plugin so sass is compiled to css into a file, instead of being injected into the head with style-loader.  
Added a watch condition to my webpack config so I can run the build command once and it stays open, watching for changes.  

### Ideas of functionality
 
- Tag tasks eg. work, family, community etc.
- calendar view
- lists
- stats 
- set reminders
- recurring tasks eg. 'every wednesday'
- product landing page
- braindump "quick note"
- habit tracking
- reschedule prior tasks - tasks from yesterday/earlier should appear in today's task view as 'overdue'
- warning if too many tasks added for today - say 6 - when there's more than 6 tasks prompt user if they want to choose another category (lest they be overwhelmed)
- dark mode
- mobile uses will probably prefer main activity kept to bottom of screen
- task sorting and searching
- login for persisting data e.g firebase

## Steps

### Build the basic html structure

Create the containers, headings, task bar, forms and modals etc. I've used Bootstrap so it doesn't look totally barebones, but will come back and style it nicely once I get the app functionality down.   

### Create a module for DOM logic

Build out the task item html to get an idea of how it should basically look, add the buttons etc., then convert this into a dom function where we can create elements, set classes, append etc.  
Store this dom funtion in a module `dom.js` to be called into the `index.js` file.   
  

### CRUD - create a task

I have a global array in my script called `tasks`. When the user adds a task, the input values are stored with a specific id (using the `Date.now()` method as this is a small app).  
  

### Saving the data to local storage

When a task is added, a custom event fires which mirrors any change to the `tasks` array to local storage, and refreshes the list of tasks on the page.  
To call it:  
`list.dispatchEvent(new CustomEvent('tasksUpdated'));`  
  
Two event listeners:  
`list.addEventListener('tasksUpdated', mirrorToLocalStorage);`  
`list.addEventListener('tasksUpdated', displayTasks);`  

Local storage in the browser only stores JSON. So for this reason my task object creation does not contain any methods.  
  

### CRUD - read the tasks

Displaying the list of tasks calls that data from local storage, which is mirrored from the global `tasks`.  This data is read by the `dom.js` module which returns a single `li` element, which itself is appended to the 'container' (`div` element).   
  

### CRUD - update a task and delete a task

First I create a click handler so when a checkbox, edit button, or delete button is clicked, the 'id' for that task is found from the list element `id` attribute, and then the relevant function is called.  
The edit and delete buttons are actually spans, as I'm using material icons - 'mode' for edit, and 'delete' for delete.  

```
function handleClick(event) {
    // event.target here will be the html element clicked.

    // get the id of the closest list element and store its id
    const id = event.target.closest('li').id;

    // check if the element clicked was a span
    if (event.target.matches('span')) {
        // then check if the textContent is 'mode' or 'delete'
        if (event.target.textContent === 'mode') {
            return editTask(id);
        } else if (event.target.textContent === 'delete') {
            return deleteTask(id);
        }
    } else if (event.target.matches('input[type=checkbox]')) {
        return markComplete(id);
    }
};
```  
  
**Edit a task**: There are two ways a task can be edited - checking a task to mark it complete, and editing the actual properties of a task.  

**Mark complete:**  
```
function markComplete(id) {
    // use find() to go through the tasks array and find reference to the first one that has an id the same as the argument. store a copy of this value in a variable.
    const taskRef = tasks.find(task => task.id == id);
    // change the boolean value of the 'completed' property to the opposite of whatever it currently is
    taskRef.completed = !taskRef.completed;

    // now access the tasks array, find the index of the task with matching id, and replace that task with taskRef
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks[taskIndex] = taskRef;

    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
};
```

These two variables `taskRef` and `taskIndex` look very similar but there's an important difference - in the first we are looking for the object itself. In the second, we are looking for that object's *position in the array*.  

One more thing: within `dom.js` where the checkbox is created, set the `checked` attribute value based on the relevant object's 'completed' key boolean value:   
```
let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('form-check-input', 'm-1')
    if (task.completed) {
        check.checked = true;
    };
```

**Edit properties:**  
There is a second modal with a form inside on the `index.html` file for editing a task. In that form, I included an input which is hidden:  
`<input type="hidden" id="hiddenField" name="id" value="" />`  
When the edit function is called, the value of the hidden input value is set to the id of the task object.  
In function editTask():  
```
const hiddenField = document.querySelector('#hiddenField');
hiddenField.value = id;
```
Then when the edit form is submitted, the id is retrieved from the hidden input value so it can be used to reference the task object to be edited.  
In function handleEditSubmit():  
```
const hiddenField = document.querySelector('#hiddenField');
let id = hiddenField.value;
```

  

### Displaying the task dates 

### Creating tasks in specific 'projects'



## Resources
[Bootstrap 4 modal is not working in sticky-top navbar](https://stackoverflow.com/questions/53315398/bootsrap-4-modal-is-not-working-in-sticky-top-navbar)  
[How to save data in localStorage using JavaScript](https://dev.to/michaelburrows/how-to-save-data-in-localstorage-using-javascript-994)  
[Saving Form Data in Client-Side Storage](https://www.raymondcamden.com/2022/03/27/saving-form-data-in-client-side-storage)  
[Storing and retrieving JavaScript objects in localStorage](https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/)  
StackOverflow answer to ['Store form data in local storage using array and retrieving it on new page'](https://stackoverflow.com/a/49609944/17232226)  
Wes Bos [Beginner JavaScript](https://beginnerjavascript.com/) exercise: 'Shopping Form with Custom Events, Delegation and localstorage'  
[Get the closest element](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)  
Stack Overflow answer to ['How can I send a variable to a form using this javascript function?'](https://stackoverflow.com/questions/4855430/how-can-i-send-a-variable-to-a-form-using-this-javascript-function) 


