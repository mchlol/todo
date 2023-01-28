(()=>{"use strict";var t={171:(t,e,n)=>{n.d(e,{Z:()=>a});const s=document.querySelector("#task-list");function a(t){let e=document.createElement("li");e.classList.add("list-group-item","task-item-wrapper","p-1"),e.setAttribute("id",t.id);let n=document.createElement("div");n.classList.add("task-text-primary");let a=document.createElement("input");a.type="checkbox",a.classList.add("form-check-input","m-1");let o=document.createElement("span");o.classList.add("fw-bold","m-1"),o.textContent=t.title;let l=document.createElement("div");l.classList.add("task-text-secondary","text-muted","small");let d=document.createElement("p");d.classList.add("m-1","text-justify"),d.textContent=t.taskNotes;let c=document.createElement("div");c.classList.add("d-flex","flex-wrap","justify-content-between","align-items-center");let r=document.createElement("span");r.classList.add("small","m-1"),t.dueDate?r.textContent=`Due ${t.dueDate}`:r.textContent="No due date";let i=document.createElement("span");i.classList.add("small","m-1"),i.textContent=t.priority+" priority";let p=document.createElement("div");p.classList.add("d-flex");let u=document.createElement("button");u.classList.add("btn","btn-sm"),u.setAttribute("id","edit"),u.innerHTML='<span class="material-icons text-primary">mode</span>';let m=document.createElement("button");return m.classList.add("btn","btn-sm"),m.setAttribute("id","delete"),m.innerHTML='<span class="material-icons text-danger">delete</span>',p.appendChild(u),p.appendChild(m),c.appendChild(r),c.appendChild(i),c.appendChild(p),l.appendChild(d),l.appendChild(c),n.appendChild(a),n.appendChild(o),e.appendChild(n),e.appendChild(l),s.appendChild(e)}}},e={};function n(s){var a=e[s];if(void 0!==a)return a.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,n),o.exports}n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=n(171);const e=document.querySelector("#add-task-form"),s=document.querySelector("#task-list");let a=[];e.addEventListener("submit",(function(t){t.preventDefault(),console.log("form submitted");const e={title:t.currentTarget.title.value,taskNotes:t.currentTarget.tasknotes.value,dueDate:t.currentTarget.dueDate.value,priority:t.currentTarget.priority.value,id:Date.now(),completed:!1};a.push(e),console.log(a),console.log(`No. of tasks in state: ${a.length}`),t.target.reset(),s.dispatchEvent(new CustomEvent("tasksUpdated"))})),s.addEventListener("tasksUpdated",(function(){return console.log("displaying current tasks array: ",a),s.innerHTML="",a.forEach((e=>(0,t.Z)(e)))})),s.addEventListener("tasksUpdated",a[0]?(console.log("task mirrored to localStorage"),localStorage.setItem("tasks",JSON.stringify(a))):console.log("nothing in tasks array")),s.addEventListener("click",(function(t){const e=t.target.closest("li").id;console.log("id: ",e),t.target.matches("span")?(console.log("span clicked"),t.target.closest("button")&&function(t){console.log("deleting task",t);let e=a.filter((e=>e.id!==t));console.log(e),a=e,console.log(a),s.dispatchEvent(new CustomEvent("tasksUpdated"))}(e)):t.target.matches("input[type=checkbox]")&&(console.log("checkbox clicked"),function(t){console.log(`changed task ${t} complete status`);const e=a.find((e=>e.id===t));console.log(e),s.dispatchEvent(new CustomEvent("tasksUpdated"))}(e))})),function(){console.log("retrieving tasks from local storage...");const t=JSON.parse(localStorage.getItem("tasks"));t?(a=t,s.dispatchEvent(new CustomEvent("tasksUpdated"))):console.log("no tasks in localStorage yet")}()})()})();
//# sourceMappingURL=index.bundle.js.map