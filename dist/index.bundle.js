(()=>{"use strict";var e={171:(e,t,n)=>{n.d(t,{y:()=>o});const a=document.querySelector("#task-list");function o(e){return a.innerHTML="",e.forEach((e=>function(e){let t=document.createElement("li");t.classList.add("list-group-item","task-item-wrapper","p-1");let n=document.createElement("div");n.classList.add("task-text-primary");let o=document.createElement("input");o.type="checkbox",o.classList.add("form-check-input","m-1");let s=document.createElement("span");s.classList.add("fw-bold","m-1"),s.textContent=e.title;let d=document.createElement("div");d.classList.add("task-text-secondary","text-muted","small");let r=document.createElement("p");r.classList.add("m-1","text-justify"),r.textContent=e.notes;let i=document.createElement("div");i.classList.add("d-flex","flex-wrap","justify-content-between","align-items-center");let l=document.createElement("span");l.classList.add("small","m-1"),e.dueDate?l.textContent=`Due ${e.dueDate}`:l.textContent="No due date";let c=document.createElement("span");c.classList.add("small","m-1"),c.textContent=e.priority+" priority";let u=document.createElement("div");u.classList.add("d-flex");let m=document.createElement("button");m.classList.add("btn","btn-sm"),m.setAttribute("id","edit"),m.innerHTML='<span class="material-icons text-primary">mode</span>';let p=document.createElement("button");return p.classList.add("btn","btn-sm"),p.setAttribute("id","delete"),p.innerHTML='<span class="material-icons text-danger">delete</span>',u.appendChild(m),u.appendChild(p),i.appendChild(l),i.appendChild(c),i.appendChild(u),d.appendChild(r),d.appendChild(i),n.appendChild(o),n.appendChild(s),t.appendChild(n),t.appendChild(d),a.appendChild(t)}(e)))}},960:(e,t,n)=>{function a(){console.log("called from store")}n.d(t,{h:()=>a})}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(171),t=n(960);(0,t.h)();let a=0;const o=new class{constructor(e,t,n,o,s){this.title=e,this.notes=t,this.dueDate=n,this.priority=o,this.taskId="task"+ ++a,this.section=(e=>{const t=new Date,n=t.toDateString(),a=new Date(e).toDateString();return n===a?"Today":Date.parse(e)<t?"Overdue":Date.parse(e)?a?"Soon":void 0:"Someday"})(n),this.category=s}}("Lorem ipsum dolor sit amet, consectetuer adipiscin","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.","2022-07-10","Medium","tasks");console.log(o);let s=[o];const d=document.querySelector("#add-task-form");document.querySelector("#title"),document.querySelector("#tasknotes"),document.querySelector("#dueDate"),document.querySelector("#priority"),document.querySelector("#save-btn"),d.onsubmit=n=>{n.preventDefault();let a={title:document.querySelector("#title"),notes:document.querySelector("#tasknotes"),dueDate:document.querySelector("#dueDate"),priority:document.querySelector("#priority")};return(0,t.h)(a),console.log(a),d.reset(),(0,e.y)(s)},(0,e.y)(s)})()})();
//# sourceMappingURL=index.bundle.js.map