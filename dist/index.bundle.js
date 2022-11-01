(()=>{"use strict";var e={171:(e,t,a)=>{a.d(t,{y:()=>s});const n=document.querySelector("#task-list");function s(e){n.innerHTML="",e.forEach((e=>function(e){let t=document.createElement("li");t.classList.add("list-group-item","task-item-wrapper","p-1");let a=document.createElement("div");a.classList.add("task-text-primary");let s=document.createElement("input");s.type="checkbox",s.classList.add("form-check-input","m-1");let o=document.createElement("span");o.classList.add("fw-bold","m-1"),o.textContent=e.title;let d=document.createElement("div");d.classList.add("task-text-secondary","text-muted","small");let l=document.createElement("p");l.classList.add("m-1","text-justify"),l.textContent=e.notes;let r=document.createElement("div");r.classList.add("d-flex","flex-wrap","justify-content-between","align-items-center");let i=document.createElement("span");i.classList.add("small","m-1"),e.dueDate?i.textContent=`Due ${e.dueDate}`:i.textContent="No due date";let c=document.createElement("span");c.classList.add("small","m-1"),c.textContent=e.priority+" priority";let m=document.createElement("div");m.classList.add("d-flex");let u=document.createElement("button");u.classList.add("btn","btn-sm"),u.setAttribute("id","edit"),u.innerHTML='<span class="material-icons text-primary">mode</span>';let p=document.createElement("button");return p.classList.add("btn","btn-sm"),p.setAttribute("id","delete"),p.innerHTML='<span class="material-icons text-danger">delete</span>',m.appendChild(u),m.appendChild(p),r.appendChild(i),r.appendChild(c),r.appendChild(m),d.appendChild(l),d.appendChild(r),a.appendChild(s),a.appendChild(o),t.appendChild(a),t.appendChild(d),n.appendChild(t)}(e)))}}},t={};function a(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=a(171);let t=0;class n{constructor(e,a,n,s,o){this.title=e,this.notes=a,this.dueDate=n,this.priority=s,this.taskId="task"+ ++t,this.section=(e=>{const t=new Date,a=t.toDateString(),n=new Date(e).toDateString();return a===n?"Today":Date.parse(e)<t?"Overdue":Date.parse(e)?n?"Soon":void 0:"Someday"})(n),this.category=o}}let s=new Date;const o=new n("Lorem ipsum dolor sit amet, consectetuer adipiscin","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.",s,"Medium","tasks");console.log(o);let d=[o];localStorage.getItem("tasks")&&JSON.parse(localStorage.getItem("tasks"));const l=document.querySelector("#add-task-form");let r=document.querySelector("#title"),i=document.querySelector("#tasknotes"),c=document.querySelector("#dueDate"),m=document.querySelector("#priority");l.onsubmit=t=>{t.preventDefault();let a=new n(r.value,i.value,c.value,m.value);return console.log(a),d.push(a),l.reset(),(0,e.y)(d)},(0,e.y)(d)})()})();
//# sourceMappingURL=index.bundle.js.map