(()=>{"use strict";const e=e=>{const t=new Date,o=t.toDateString(),n=new Date(e).toDateString();return o===n?"Today":Date.parse(e)<t?"Overdue":Date.parse(e)?n?"Soon":void 0:"Someday"};console.log("Today: "+e("2022-10-26")),console.log("Yesterday: "+e("2021-10-26")),console.log("No input: "+e()),console.log("Future: "+e("2022-10-28")),console.log("null: "+e(null)),console.log("undefined: "+e(void 0)),console.log("random string: "+e("ahlfkahef")),console.log("2: "+e(2)),console.log("Huge number: "+e(999999999999999));let t=new Date;const o=new class{constructor(e,t,o,n,s){this.title=e,this.description=t,this.dateAdded=o.toDateString(),this.dueDate=n.toDateString(),this.priority=s}}("Lorem ipsum dolor sit amet, consectetuer adipiscin","make list, buy adaptor, find winter clothes, replace batteries",t,t,"Low priority");console.log(o);const n=document.querySelector("#task-list");!function(e){let t=document.createElement("li");t.classList.add("list-group-item","task-item-wrapper","m-1","p-1");let o=document.createElement("div");o.classList.add("task-text-primary");let s=document.createElement("input");s.type="checkbox",s.classList.add("form-check-input","m-1");let l=document.createElement("span");l.classList.add("fw-bold","m-1"),l.textContent=e.title,o.appendChild(s,l),document.createElement("div").classList.add("task-text-secondary"),t.appendChild(o),n.appendChild(t)}(o)})();
//# sourceMappingURL=index.bundle.js.map