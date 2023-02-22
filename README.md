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

### Ideas for functionality
 
- Display the current date  
- accessibility
- Tag tasks eg. work, family, community etc.
- lists
- recurring tasks eg. 'every wednesday'
- braindump "quick note"
- reschedule prior tasks - tasks from yesterday/earlier should appear in today's task view as 'overdue'
- warning if too many tasks added for today - say 6 - when there's more than 6 tasks prompt user if they want to choose another date or category (lest they be overwhelmed)
- dark mode
- task sorting and searching

## Steps

### Build the basic html structure for the user interface

Create the containers, headings, task bar, forms and modals etc. I've used Bootstrap so it doesn't look totally barebones, but will come back and style it nicely once I get the app functionality down.  
On the page will be the form to add a task, which I've put in a modal so clicking on a button will open that modal, and the user will be able to fill out the form.  
Select the form,  
`const form = document.querySelector('#add-task-form');`  
and add an event listener to run a function when the user submits the form.  
`form.addEventListener('submit', handleSubmit);`  

We will do the same thing later with editing a task.  


### CRUD - create a task

When the above mentioned form is submitted, the input values are stored as properties on an object. Title, notes, due date, priority, completed status (false by default). There are two more special properties:  
- `id` which is set to `Date.now()` to create a unique number.  
- `category` which reads the due date the user input, and runs another function that compares the date to today's date and assigns a string like 'today' or 'overdue'.  

Next, the object is pushed to a global array, `tasks`.  
Finally a custom event fires on the `list` html element (my container for displaying tasks) - this will call the mirror to local storage function, and the function for actually displaying the tasks.   

```
function handleSubmit(event) {
    event.preventDefault(); 

    const task = {
        title: event.currentTarget.title.value,
        taskNotes: event.currentTarget.tasknotes.value,
        dueDate: event.currentTarget.dueDate.value,
        priority: event.currentTarget.priority.value,
        id: Date.now(),
        completed: false,
        category: checkDueDate(dueDate)
    };
    
    tasks.push(task); 
    event.target.reset();
    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}
```

*The function also uses `event.preventDefault()` to stop the page refresh with data in the URL behaviour, and `event.target.reset();` which clears all the form inputs.*  
  

### Saving the data to local storage

When a task is added, a custom event fires which mirrors any change to the `tasks` array to local storage, and refreshes the list of tasks on the page.  
To call it:  
`list.dispatchEvent(new CustomEvent('tasksUpdated'));`  
  
Two event listeners:  
`list.addEventListener('tasksUpdated', mirrorToLocalStorage);`  
`list.addEventListener('tasksUpdated', displayTasks);`  

Local storage in the browser only stores JSON. So for this reason my task object creation does not contain any methods.  
  

### CRUD - read the tasks

First we'll check if there are actully any tasks to display. Check the global tasks array, then for good measure double check local storage too. Just in case.    
Make sure the container is empty with `innerHTML = ""` then call the function `noTasks()` exported from `dom.js` - this appends some text to the container to advise the user that there's no tasks to display!  
To display the tasks, clear anything from the container with `innerHTML = ""` then loop over each item in the tasks array and call the function (from `dom.js`) to create a list item element.  
Store this in a variable and then return that variable at the end of the function.  
  
*Note: when retrieving data from local storage, it will be in JSON so must be parsed back into an object.*  
 

```
function displayTasks() {
    if (tasks.length === 0) {
        if (JSON.parse(localStorage.getItem('tasks')).length === 0) {
            list.innerHTML = '';
            return noTasks();
        } else {
            return console.log('the tasks array is empty but local storage is not');
        }
    } else {
        list.innerHTML = '';
        const html = tasks.forEach(
        task => createLiElement(task)
        );
        return html;
    }
}
```

### Create a module for DOM logic

Build out the task item html to get an idea of how it should basically look, add the buttons etc., then convert this into a function that will create elements, set the Bootstrap classes, append etc.  
Store this dom funtion in a module `dom.js` to be called into the `index.js` file.  
When the display function runs it will call this function in  a forEach to display all of the tasks. [View that part of the code here](#crud---read-the-tasks).

When the list item is created, assign the id from the object to the `id` attribute of the element.  
```
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'task-item-wrapper', 'p-1')
    listItem.setAttribute('id', task.id);
```

Most importantly, this function will display the values of the task object.  
```
    let title = document.createElement('span');
    title.classList.add('fw-bold', 'm-1')
    title.textContent = task.title;
```
Aside from just creating the html elements etc., we also need to check a couple of things to make sure the correct info is displayed:

#### The checkbox 

If a task object has a `completed` key with a value of `true`, the checkbox on the DOM element will appear checked.  
```
let check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('form-check-input', 'm-1')
    if (task.completed) {
        check.checked = true;
    };
```
##### The due date

Check the value of the task dueDate, to handle the case where the user did not select any date.  
```
if (!task.dueDate) {
        dueDate.textContent = 'No due date';
    }  else dueDate.textContent = `Due ${task.dueDate}`;
```

After all the elements have been created, they need to be appended to any containers that have also been created, such as the 'details row' that will hold the due date, priority, and the edit and delete buttons.  
``` 
    iconWrap.append(editBtn,delBtn);
    detailsRow.append(dueDate,category,priority,iconWrap);
    taskSecondaryWrap.append(notes,detailsRow);
    taskPrimaryWrap.append(check,title)
    listItem.append(taskPrimaryWrap,taskSecondaryWrap);
```
*By using `append` instead of `appendChild` we can append multiple elements at once.*  

Finally at the end of the function, after appending all the containers to the list element, return that list element.  
```
return taskList.appendChild(listItem);
```
  

### CRUD - update a task and delete a task

First I create a click handler so when a checkbox, edit button, or delete button is clicked, the 'id' for that task is found from the list element `id` attribute, and then the relevant function is called.  
The edit and delete buttons are actually spans, as I'm using Material Icons - 'mode' for edit, and 'delete' for delete.  

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
There is a second modal with a form in the `index.html` file, for editing a task. In that form, I include an input which is hidden:  
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

The other important thing this function does is display all the current task object's properties in the form inputs.  
I do this by accessing each input and setting its value, e.g.:  
```
    const titleEdit = document.querySelector('#titleEdit');
    titleEdit.value = task.title;
```

**Delete a task:**  
  
We can delete a task by filtering the array and leaving ONLY those that don't match the id. If there is only one task though, we can just empty the array entirely. The custom event will empty the local storage array too, so when the display function is called we'll get the 'no tasks' message.  
Otherwise if there is more than one task, filter the array, then replace the global tasks array with the filtered array.  

```
function deleteTask(id) {
if (tasks.length === 1) {
        tasks = [];
        list.dispatchEvent(new CustomEvent('tasksUpdated'));
    } else {
        let filteredTasks = tasks.filter(task => task.id != id);
        tasks = filteredTasks;
    }

    return list.dispatchEvent(new CustomEvent('tasksUpdated'));
}
```


###  Additional steps in this project yet to be tackled:  

- Refactor the code to use classes or factory functions to create the objects.   
- Creating separate view sections so the user can create projects to store tasks in, and switch between viewing project tasks and general tasks.  
- Modify the way task due dates are displayed (only displayed, not stored) - eg "Sun 19 Feb 23" instead of "2023-02-19".  
- Sort tasks by due date instead of pushing to the bottom.  




## Resources  

Links to some of the docs, tutorials, blog posts, or stack overflow answers I used while working on various parts of this project.  

- [Bootstrap 4 modal is not working in sticky-top navbar](https://stackoverflow.com/questions/53315398/bootsrap-4-modal-is-not-working-in-sticky-top-navbar)  
- [How to save data in localStorage using JavaScript](https://dev.to/michaelburrows/how-to-save-data-in-localstorage-using-javascript-994)  
- [Saving Form Data in Client-Side Storage](https://www.raymondcamden.com/2022/03/27/saving-form-data-in-client-side-storage)  
- [Storing and retrieving JavaScript objects in localStorage](https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/)  
- StackOverflow answer to ['Store form data in local storage using array and retrieving it on new page'](https://stackoverflow.com/a/49609944/17232226)  
- Wes Bos [Beginner JavaScript](https://beginnerjavascript.com/) exercise: 'Shopping Form with Custom Events, Delegation and localstorage'  
- [Get the closest element](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)  
- Stack Overflow answer to ['How can I send a variable to a form using this javascript function?'](https://stackoverflow.com/questions/4855430/how-can-i-send-a-variable-to-a-form-using-this-javascript-function) 
- [Anchors in Markdown](https://gist.github.com/asabaylus/3071099)  


