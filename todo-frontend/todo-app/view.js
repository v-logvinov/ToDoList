function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.disabled = true;
    button.textContent = 'Добавить дело';

    input.addEventListener('input', () => {
        if (input.value == '') {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button,
    }
}

function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItem(todoItem, { onDone, onDelete }) {
    const item = document.createElement('li');

    const buttonGroup = document.createElement('div');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (todoItem.done == true) item.classList.add('list-group-item-success');
    item.textContent = todoItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', () => {
        onDone({ element: item, todoItem });
        item.classList.toggle('list-group-item-success');
    });
    deleteButton.addEventListener('click', () => {
        onDelete({ todoItem, element: item });
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item;
}

async function createTodoApp(container, {
    title,
    owner,
    todoItemsList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
}) {
    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();
    const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemsList.forEach(todoItem => {
        const todoItemElement = createTodoItem(todoItem, handlers);
        todoList.append(todoItemElement);
    });

    todoItemForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!todoItemForm.input.value) {
            return;
        }

        const todoItem = await onCreateFormSubmit({
            owner,
            name: todoItemForm.input.value.trim(),
        });

        const todoItemElement = createTodoItem(todoItem, handlers);

        todoList.append(todoItemElement);

        todoItemForm.button.disabled = true;
        todoItemForm.input.value = '';

    })

}

export { createTodoApp };

