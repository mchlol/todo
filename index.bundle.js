(()=>{"use strict";var e={171:(e,t,n)=>{function o(){console.log("called from dom.js")}n.d(t,{B:()=>s,W:()=>o});const a=document.querySelector("#task-list");function s(e){let t=document.createElement("li");t.classList.add("list-group-item","task-item-wrapper","p-1");let n=document.createElement("div");n.classList.add("task-text-primary");let o=document.createElement("input");o.type="checkbox",o.classList.add("form-check-input","m-1");let s=document.createElement("span");s.classList.add("fw-bold","m-1"),s.textContent=e.title;let l=document.createElement("div");l.classList.add("task-text-secondary","text-muted","small");let d=document.createElement("p");d.classList.add("m-1","text-justify"),d.textContent=e.notes;let i=document.createElement("div");i.classList.add("d-flex","flex-wrap","justify-content-between","align-items-center");let r=document.createElement("span");r.classList.add("small","m-1"),e.dueDate?r.textContent=`Due ${e.dueDate}`:r.textContent="No due date";let c=document.createElement("span");c.classList.add("small","m-1"),c.textContent=e.priority+" priority";let m=document.createElement("div");m.classList.add("d-flex");let p=document.createElement("button");p.classList.add("btn","btn-sm"),p.setAttribute("id","edit"),p.innerHTML='<span class="material-icons text-primary">mode</span>';let u=document.createElement("button");return u.classList.add("btn","btn-sm"),u.setAttribute("id","delete"),u.innerHTML='<span class="material-icons text-danger">delete</span>',m.appendChild(p),m.appendChild(u),i.appendChild(r),i.appendChild(c),i.appendChild(m),l.appendChild(d),l.appendChild(i),n.appendChild(o),n.appendChild(s),t.appendChild(n),t.appendChild(l),a.appendChild(t)}}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(171);const t=e=>{const t=new Date,n=t.toDateString(),o=new Date(e).toDateString();return n===o?"Today":Date.parse(e)<t?"Overdue":Date.parse(e)?o?"Soon":void 0:"Someday"};console.log("Today: "+t("2022-10-26")),console.log("Yesterday: "+t("2021-10-26")),console.log("No input: "+t()),console.log("Future: "+t("2022-10-28")),console.log("null: "+t(null)),console.log("undefined: "+t(void 0)),console.log("random string: "+t("ahlfkahef")),console.log("2: "+t(2)),console.log("Huge number: "+t(999999999999999));let o=0,a=new Date;const s=new class{constructor(e,t,n,a){this.title=e,this.notes=t,this.dueDate=n.toDateString(),this.priority=a,this.taskId="task"+ ++o}}("Lorem ipsum dolor sit amet, consectetuer adipiscin","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.",a,"Medium");console.log(s),(0,e.W)(),(0,e.B)(s)})()})();
//# sourceMappingURL=index.bundle.js.map