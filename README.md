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

### Saving the data to local storage

Local storage in the browser only stores JSON. So for this reason my task object creation does not contain any methods.  
I learned custom events from one of Wes Bos' courses. I have a global array in my script called `tasks`. When a task is added, a custom event fires which mirrors any change to the `tasks` array to local storage, and refreshes the list of tasks on the page.  
Displaying the list of tasks calls that data from local storage, not from `tasks`.  


### Task edit and delete buttons

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


