# To do list - WIP

Time to tackle the ol' to do list app. 

## Technologies & tools

- Figma
- HTML
- JavaScript (vanilla)
- Bootstrap
- Sass for custom CSS
- Webpack
- Git

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
- warning if too many tasks added for today - say 6 - when there's more than 6 tasks prompt user if they want to choose another category lest they be overwhelmed
- dark mode
- mobile uses will probably prefer main activity kept to bottom of screen
- task sorting and searching
- login for persisting data e.g firebase


Based on the format of [Todoist](https://todoist.com), an app I use in everyday life. No need to reinvent the wheel.  
I have created my design in Figma, [which can be seen here](https://www.figma.com/file/lNjJ3WOAyo7zY9mGzCDK3u/Todo?node-id=0%3A1).
The UI uses a 2 column layout - nav on the left, section view on the right.  
**Nav** will have 2 boxes;  
- Tasks - categories are: today (default), future, and no date. *Categories cannot be created or deleted.*  
- Projects - added by user and ordered by oldest first. *Projects can be created and deleted.*  

The section view will be divided into two rows;  
- Add new task
- View pane  

The view pane will have 2 sections, with a heading at the top followed by a list of tasks.  


### Task item requirements

Default behaviour for task quick add:  
- title: from input
- description: null
- date: current date
- dueDate: current date
- priority: 4  
- id number: generated? 

Each task will be presented in a row, starting with a checkbox, and ending with a delete button.  

**Priority:** Tasks have 4 priority levels, from 1 (highest) to 4 (lowest, default).  


## Functionality

### JavaScript pseudocode/algorithm 

create a text input and button  
create a div to act as a view pane  
clicking the button creates an object  
make a class to create the todo objects from  
each todo object contains the string from the text input as 'title'  
along with 'description' 'dueDate' and 'priority'  


