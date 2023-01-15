# To do list - WIP

Time to tackle the ol' to do list app. 

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

## Project set up

### Scaffolding

Linked Bootstrap via the CDN.  
Followed the [webpack project set up tutorial](https://webpack.js.org/guides/getting-started/) again  
Added sass and mini css extract plugin so sass is compiled to css into a file, instead of being injected into the head with style-loader.  
Added a watch condition to my webpack config so I can run the build command once and it stays open, watching for changes.  

### User interface 

**Start by doing research.**  
Go to Dribbble and Behance and look for To do list app projects to get inspiration and ideas.  

- Tag tasks eg. work, family, community etc.
- calendar view
- lists
- stats
- set reminders
- recurring tasks eg. 'every wednesday'
- landing page
- braindump "quick note"
- habit tracking
- reschedule prior tasks - tasks from yesterday/earlier should appear in today's task view as 'overdue'
- warning if too many tasks added for today - say 6 - when there's more than 6 tasks prompt user if they want to choose another category (lest they be overwhelmed)
- dark mode
- mobile uses will probably prefer main activity kept to bottom of screen
- task sorting and searching
- login for persisting data e.g firebase

## The Script

### Create a module for DOM logic

Select the unordered list element that will have each task as a list item.   
**To create a list item (task):** Create a function that takes an object, creates a list item, then creates all the inner html elements, assigns the css classes, sets the text content based on the object's values, appends all the various bits and pieces (checkbox, delete button, due date etc.) and returns a list item.   
**To display the list of tasks:** Create another function that takes an array, removes all the content of the ul and then returns a forEach loop to call the above function on each list item (task) in the array (collection of tasks).  
*The second function has closure over the first function so the module only needs to export the second function.*  


### Saving the data to local storage

When a task is added (or edited, or deleted) this should be saved in local storage.  
First handle the case that the data is not in local storage.  
Local storage uses JSON which cannot store functions, so methods will need to be added after the data is retrieved.  


### Task edit and delete buttons

Starting with delete, add the functionality to remove a task from the array when the delete button for a specific task is clicked, and then refresh the display of the remaining tasks


## Resources
[Bootstrap 4 modal is not working in sticky-top navbar](https://stackoverflow.com/questions/53315398/bootsrap-4-modal-is-not-working-in-sticky-top-navbar)  
[How to save data in localStorage using JavaScript](https://dev.to/michaelburrows/how-to-save-data-in-localstorage-using-javascript-994)  
[Saving Form Data in Client-Side Storage](https://www.raymondcamden.com/2022/03/27/saving-form-data-in-client-side-storage)  
[Storing and retrieving JavaScript objects in localStorage](https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/)
[StackOverflow answer](https://stackoverflow.com/a/49609944/17232226)  
Wes Bos [Beginner JavaScript](https://beginnerjavascript.com/) exercise: 'Shopping Form with Custom Events, Delegation and localstorage'  
[Get the closest element](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)  


