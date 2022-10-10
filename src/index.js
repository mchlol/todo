import printMe from './print.js';
import './input.scss';

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

// add class '.active' to show current section
// add badges to show no of tasks in a section
// https://getbootstrap.com/docs/5.0/components/list-group/

