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

### User interface design

Based on the format of [Todoist](https://todoist.com), an app I use in everyday life. No need to reinvent the wheel.  
I have created my design in Figma, [view it here](https://www.figma.com/file/lNjJ3WOAyo7zY9mGzCDK3u/Todo?node-id=0%3A1).
The UI uses a 2 column layout - nav on the left, section view on the right.  
**Nav** will have 2 boxes;  
- Tasks - today (default), future, and no date.  
- Projects - added by user and ordered by oldest first. *Projects can be deleted.*  

The section view will be divided into two rows;  
- Add new task
- View pane, showing all the tasks in the currently selected view  


### Task item requirements

Default behaviour for task quick add:  
- title: from input
- description: null
- date: current date
- dueDate: current date
- priority: 4  
Tasks have 4 priority levels, from 1 (highest) to 4 (lowest, default).  


## Functionality

### JavaScript pseudocode/algorithm 

create a text input and button  
create a div to act as a view pane  
clicking the button creates an object  
make a class to create the todo objects from  
each todo object contains the string from the text input as 'title'  
along with 'description' 'dueDate' and 'priority'  


