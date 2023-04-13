export async function getTodoList(owner) {
    let storage = JSON.parse(localStorage.getItem(owner));
    if (!storage) {
        storage = [];
        localStorage.setItem(owner, JSON.stringify(storage));
    }
    return storage;
}

export async function createTodoItem({ owner, name }) {
    const storage = JSON.parse(localStorage.getItem(owner));
    const todoItem = {
        name,
        done: false,
        owner: owner,
    };
    storage.push(todoItem);
    localStorage.setItem(owner, JSON.stringify(storage));
    return todoItem;
}


export function switchTodoItemDone({ element, todoItem }) {
    todoItem.done = !todoItem.done;

    const storage = JSON.parse(localStorage.getItem(todoItem.owner));
    console.log(todoItem);
    const index = Array.from(element.parentNode.children).indexOf(element);
    storage[index].done = todoItem.done;

    localStorage.setItem(todoItem.owner, JSON.stringify(storage));
}

export function deleteTodoItem({ element, todoItem }) {
    if (!confirm('Вы уверены?')) {
        return;
    }
    const storage = JSON.parse(localStorage.getItem(todoItem.owner));
    const index = Array.from(element.parentNode.children).indexOf(element);
    storage.splice(index, 1);
    element.remove();

    localStorage.setItem(todoItem.owner, JSON.stringify(storage));
}
