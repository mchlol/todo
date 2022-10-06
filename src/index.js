import _ from 'lodash';
import printMe from './print.js';
import './input.scss';

function component() {
    // select the view pane
    const viewPane = document.querySelector('#view-pane');
    viewPane.classList.add('view-pane');

    viewPane.innerHTML = _.join(['first', 'second'], ' ');

    const btn = document.createElement('button');
    btn.textContent = 'Click me and check the console';
    btn.onclick = printMe;
    viewPane.appendChild(btn);

  
    return viewPane;
  }
  
component();