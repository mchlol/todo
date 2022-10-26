import printMe from './print.js';
import './input.scss';

console.log('it works');
printMe();


// check task category
const checkDueDate = (date) => {
    const today = new Date();
    const todayString = today.toDateString();
    const dateInput = new Date(date);
    const dateString = dateInput.toDateString();

    if (todayString === dateString) {
        return `Today`;
    } 
    else if (Date.parse(date) < today) {
        return `Overdue`;
    } 
    else if (!Date.parse(date)) {
        return `Someday`;
    } 
    else if (dateString) {
        return `Soon`;
    }
};

console.log(checkDueDate('2022-10-26'));
console.log(checkDueDate('2021-10-26'));
console.log(checkDueDate());
console.log(checkDueDate('2022-10-28'));

const currentTitleHandler = function(viewTitle) {
    
}

const viewHeadingH2 = document.querySelector('#current-view-title');
viewHeadingH2.textContent = "Today";



/*
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

