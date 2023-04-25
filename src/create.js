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
    //methods - toggle completed, set dueDate string value

}

class Project {
    constructor(title,description) {
        this.title = title;
        this.description = description;
        this.projects = []; // ready to store stuff!
    }
    // methods 
}

export {
    Task, 
    Project
}