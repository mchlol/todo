class Task {
    constructor(title,notes,dueDate,priority,project) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = Date.now(); // unique identifier
        this.completed = false; // by default
        this.project = project;
    }
    // add methods - toggle completed, set dueDate string value
    
    // we need to add methods AFTER calling the data from localStorage 
    // maybe we should be storing the data in localStorage first i.e. mirror FROM instead of TO
    // add task -> data to localstorage -> mirror to app - > call display 

}

class Project {
    constructor(title,description) {
        this.title = title;
        this.description = description;
        this.tasks = []; // ready to store stuff!
    }
    // methods 
}

export {
    Task, 
    Project
}