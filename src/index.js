import printMe from './print.js';
import './input.scss';

console.log('it works');

function component() {
    const viewPaneWrap = document.querySelector('#view-pane-wrap');
    const viewHeading = document.querySelector('#viewHeading');
    


    const viewPane = document.querySelector('#current-view-pane');
    viewPane.classList.add('view-pane', 'm-1');
    viewPane.innerHTML = "All content in this panel is generated with JavaScript";

    const btn = document.createElement('button');
    btn.classList.add('btn','btn-primary');
    btn.textContent = 'Click me and check the console';
    btn.onclick = printMe;
    viewPane.appendChild(btn);

  
    return viewPane;
  }
  
// component();
printMe();

/*
user clicks to add task
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

