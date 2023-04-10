# To do list - WIP

Time to tackle the ol' to do list app. 
This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) curriculum.  
The code for this project does contain a lot of comments and console logs. As this is a beginner project, at this point I plan to leave them *for my own reference*.  

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

After all the elements have been created, they need to be appended to any containers that have also been created and then to the list item element.  
``` 
    iconWrap.append(editBtn,delBtn);
    detailsRow.append(dueDate,category,priority,iconWrap);
    taskSecondaryWrap.append(notes,detailsRow);
    taskPrimaryWrap.append(check,title)

    listItem.append(taskPrimaryWrap,taskSecondaryWrap);
```
*`appendChild` can only append one element at a time. By using `append` instead, we can append multiple elements at once.*  

Finally at the end of the function, return that list element.  
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
(The idea for this came from the answers to [this stack overflow question](https://stackoverflow.com/questions/4855430/how-can-i-send-a-variable-to-a-form-using-this-javascript-function)).  
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

### Date formatting

I installed [date-fns](https://date-fns.org/) with npm, but I found the docs were not so beginner friendly. I used [this tutorial](https://www.section.io/engineering-education/javascript-dates-manipulation-with-date-fns/) to help me work out how to use it.  
What I want to do, is display a short date in a human-readable format on each task. I don't want to change the date on the object in any way, just the way it's displayed. So I put the below code into my dom.js module:
```
const {format} = require('date-fns');
function dateHandler(date) {
    return format(date,'EEE dd MMM yyyy');
};
```
And within my createLiElement function, at the part where a span is created to hold the task due date:
```
    let parsedDate = Date.parse(task.dueDate);
    dueDate.textContent = dateHandler(parsedDate);
```
So we take the date the user input from the date picker in the form, run it through the function with the help of date-fns, and show a date that's easier to read.  

I also realised that the 'soon, 'someday' etc display of a task was being assigned when the task was created. This means those categories were not updating with the passing of time.  
I moved this function into the dom.js module and refactored the display function slightly, so this category is now assigned when the task is displayed, NOT created.  
I used date-fns for this too.  
```
function checkDueDate(date) {
    let showDueDate;
    let input = new Date(date);
    input.setHours(0,0,0,0); // set time to 00:00:00 sharp

    let today = new Date();
    today.setHours(0,0,0,0);

    if (!isValid(input)) { 
        showDueDate = "Someday";
    } else if (isEqual(input,today)) {
        showDueDate = "Today";
    } else if (isBefore(input,today)) {
        showDueDate = "Overdue";
    } else if (isAfter(input,today)) {
        showDueDate = "Soon";
    } else {
        showDueDate = "???";
    }
    return showDueDate;
};
```
The date input from the date-picker is a string, so this needs to be converted into a date object. Get today's date as well so we can compare if the date is in the past or future etc. and set both times to midnight, so the time won't throw off our comparison.  
Then use an if/else to assign the category based on the result of the date-fns function i.e. `isBefore` will show if the input date is before today's date, etc.  

### Sorting

When we add a new task, it is added to the bottom of the list of tasks displayed. It would be better to have high priority tasks at the top - maybe also sorted by due date.  

A `sort()` function in JavaScript can make use of a compare function to sort values in a way that isn't necessarily alphabetical or numerical.  

>`list.sort((a, b) => (a.color > b.color) ? 1 : -1)`
>
> When we return 1, the function communicates to sort() that the object b takes precedence in sorting over the object a. Returning -1 would do the opposite.
>
> The callback function could calculate other properties too, to handle the case where the color is the same, and order by a secondary property as well:
>
>`list.sort((a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )`  
>
> *["How to sort an array of objects by a property value in JavaScript"](https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/) - Flavio Copes*

Currently when a task is created the user selects the priority from a dropdown list where 'low' is the default, but they can also choose 'high' or 'medium'. These values are stored on the task object as a string. However, to use a regular sort function the values will be sorted alphabetically which ends up as `['high', 'low', 'medium']`.  
To get around this we can just change the value stored as a string to a numerical value instead - high is 1, medium is 2, and low is 3.  
First we change the input values on the add task form (and the edit task form).  

index.html
```
<label for="priority">Priority
    <select name="priority" id="priority" class="form-control form-select">
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option selected value="3">Low</option>
    </select>
</label>
```

Then in the display function we can check for numerical values instead of strings.  

```
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
```
*Note the value is created as a string e.g. "1" so we use loose equality here.*

So we have stored priority levels as numerical values, used those values in a function to sort the tasks by priority, and finally we call that function when we copy the tasks array to local storage.  The display function calls the local storage values, so we can retain the original tasks (the local variable in index.js) and only display the sorted array from local storage.  

Next - when we edit the priority on a task - eg. from low to high - the tasks should change order without having to refresh the page.  
Fix - change the local variable tasks to call from local storage tasks instead:  
in `displayTasks()`:
```
const html = JSON.parse(localStorage.getItem('tasks')).forEach(
        task => createLiElement(task)
        );
```

## "Projects" views

I saved this part for last as it feels quite overwhelming to me.  
So we have one array that holds all of our tasks. When a task is created it goes straight into that array and the info in that array is displayed by default when we open the app. This is 'daily tasks'.  
What we need to do now is give the user the option to create project sections and add tasks specifically to those projects.  

In Todoist, the user can create a task and assign it to a section from **pre-created** projects. So creating a project and adding a task are two separate actions.  

When the user creates a project section, it needs to be added to the `index.html` in the 'projects' drop up list. We'll do this in the `dom.js` file.  

So here is what I'd like to end up with:  

- daily tasks
- pre created project 1
- pre created project 2  

When the user attempts to delete a project that contains tasks, we should have an alert prompting the user to confirm they want to delete.  


### Building

Create an empty array called `projects` within which will be nested arrays for each set of tasks. We'll make the default `dailyTasks` and allow the user to add more sections to it.  
There will need to be another modal form where the user can create a new project. Whatever they add here will create an array nested within `projects`.  
In the section where the task object is created, we'll add another property `project`. In the form, we'll add another part where the user can leave the task in 'daily tasks' or add it to a specific project.  
When the task is created it goes into the `tasks` array. We need to use the task objects `projects` property to change the array that the task object goes into. The project titles from the `projects` array populate the `option` elements.  


## Other Thoughts

**Separation of concerns**  
In the display function, we are checking a couple of conditions and changing the display based on those conditions.  
If the task object has a completed property set to true, the checkbox for that task will be checked and the title will have a line-through style. 
The task due status ('soon', 'someday', etc) changes based on the duedate of the task object.  
I am thinking this may be bad practice as the function is technically doing things outside 'display' related things. Or is it? Either way, a way around it might be to pass these properties to check against as arguments to the display function somehow.  

**Duplicating code**  
The html file contains a lot of repeated code but *slightly* different, for creating the three forms and their modal triggers. There must be a more concise way to create these without having to rewrite all the forms for their specific purposes.  

---

###  Additional steps in this project yet to be tackled:  

- Refactor the code to use classes or factory functions to create the objects.  
- Refactor to make better use of modules 
- Creating separate sections so the user can create projects with separate tasks in them, and switch between viewing project tasks and general tasks.  
- Display the 'add task' button with text on larger screens, and as a circle with a plus sign on small screens. The button element itself can be changed with a css class, but we have to change the content of the element as well.  



## Resources  

Links to some of the docs, tutorials, blog posts, stack overflow answers etc. that I used while working on various parts of this project.  

- [Bootstrap 4 modal is not working in sticky-top navbar](https://stackoverflow.com/questions/53315398/bootsrap-4-modal-is-not-working-in-sticky-top-navbar)  
- [How to save data in localStorage using JavaScript](https://dev.to/michaelburrows/how-to-save-data-in-localstorage-using-javascript-994)  
- [Saving Form Data in Client-Side Storage](https://www.raymondcamden.com/2022/03/27/saving-form-data-in-client-side-storage)  
- [Storing and retrieving JavaScript objects in localStorage](https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/)  
- StackOverflow answer to ['Store form data in local storage using array and retrieving it on new page'](https://stackoverflow.com/a/49609944/17232226)  
- Wes Bos [Beginner JavaScript](https://beginnerjavascript.com/) exercise: 'Shopping Form with Custom Events, Delegation and localstorage'  
- [Get the closest element](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)  
- Stack Overflow answer to ['How can I send a variable to a form using this javascript function?'](https://stackoverflow.com/questions/4855430/how-can-i-send-a-variable-to-a-form-using-this-javascript-function)  
- [How to clone an array in JavaScript](https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/)
- [Anchors in Markdown](https://gist.github.com/asabaylus/3071099)  
- Gradient background recreated from looking at [the Laravel website!](https://laravel.com/)  



