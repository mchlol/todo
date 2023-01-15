function mirrorToLocalStorage(array) {
    console.log('task saved to localStorage');
    localStorage.setItem('tasks', JSON.stringify(array));
    console.log(localStorage.getItem('tasks'));
}

function restoreFromLocalStorage() {
    console.log('retrieving tasks from localStorage...');
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    if (localStorageTasks.length) {
        tasks = localStorageTasks;
        list.dispatchEvent(new CustomEvent('tasksUpdated'));
    } else {
        console.log('nothing in localStorage')
    }
}

export {
    mirrorToLocalStorage,
    restoreFromLocalStorage,
};