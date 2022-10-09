import printMe from './print.js';
import './input.scss';

function component() {
    const viewPane = document.querySelector('#view-pane');
    viewPane.classList.add('view-pane');
    viewPane.innerHTML = "test";

    const btn = document.createElement('button');
    btn.classList.add('btn','btn-primary');
    btn.textContent = 'Click me and check the console';
    btn.onclick = printMe;
    viewPane.appendChild(btn);

  
    return viewPane;
  }
  
component();

// add class '.active' to show current section
// add badges to show no of tasks in a section
// https://getbootstrap.com/docs/5.0/components/list-group/

