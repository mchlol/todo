function create() {
    console.log('create things here');
};

class Task {
    constructor(title,notes,dueDate,priority,id,completed,project) {
        this.title = title;
        this.notes = notes;
        this.priority = priority;
        this.id = Date.now(); // unique identifier
    }
    toggleCompleted() {
        this.completed ? true : false;
    }
    
    //methods - toggle completed, set dueDate string value
}

export {
    create,
}