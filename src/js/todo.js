const body = document.querySelector("body");
const addTodoButton = document.querySelector(".add-todo");
const addTodoModal = document.querySelector(".add-todo-modal");
const addTodoModalCancel = document.querySelector(".add-todo-modal__cancel");
const addTodoModalForm = document.querySelector(".add-todo-modal__form");
const todoListContainer = document.querySelector(".todo-list-container");
const users = JSON.parse(localStorage.getItem("users"));
const currentUser = JSON.parse(localStorage.getItem("user"));
const todoListItemCheck = document.querySelectorAll(".todo-list-item .check");

if (todoListItemCheck) {
  todoListItemCheck.forEach((todo) => {
    todo.addEventListener("click", (e) => {
      checkTodo(e);
    });
  });
}

window.onload = () => {
  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    const user = users.find((user) => user.username === currentUser);

    const userTodos = user.todos;
    listTodos(userTodos);
  }
};

if (addTodoButton) {
  addTodoButton.addEventListener("click", () => {
    addTodoModal.classList.add("active");
    body.classList.add("overflow-hidden");
  });
}

if (addTodoModal) {
  addTodoModalCancel.addEventListener("click", () => {
    addTodoModal.classList.remove("active");
    body.classList.remove("overflow-hidden");
  });
}

if (addTodoModalCancel) {
  addTodoModalCancel.addEventListener("click", () => {
    addTodoModal.classList.remove("active");
    body.classList.remove("overflow-hidden");
  });
}

if (addTodoModalForm) {
  addTodoModalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoInput = document.querySelector("#todoInput").value;
    const todoDate = document.querySelector("#todoDate").value;

    if (todoInput.length == 0 || todoDate.length == 0) {
      alert("todo title or date cannot be empty");
    } else {
      const todo = {
        id: Date.now(),
        title: todoInput,
        date: todoDate,
        checked: false,
      };

      const user = users.find((user) => user.username === currentUser);
      user.todos.push(todo);
      localStorage.setItem("users", JSON.stringify(users));

      const userTodos = user.todos;
      listTodos(userTodos);

      addTodoModal.classList.remove("active");
      body.classList.remove("overflow-hidden");
    }
  });
}

function listTodos(todos) {
  todos.forEach((todo) => {
    const date = new Date(todo.date);
    const dateFormat = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const newTodoListDayItemId = month + day;
    const newTodoListItemId = `todo${todo.id}`;

    const newTodoListDayItem = `
      <div id="${newTodoListDayItemId}" class="todo-list-day-item">
        <h2>
          <i class="icon-calendar"></i>
          ${dateFormat}
        </h2>
      </div>
    `;

    const newTodoListItem = `
        <div id="${newTodoListItemId}" class="todo-list-item  ${
      todo.checked && "checked"
    }">
          <button type="button" class="check" onclick="checkTodo(event)"><i class="icon-check"></i></button>
          <input type="text" class="input" value="${todo.title}">
          <button type="button" class="edit" onclick="updateTodo(event)"><i class="icon-pen"></i></button>
          <button type="button" class="delete" onclick="deleteTodo(event)"><i class="icon-trash"></i></button>
        </div>
    `;

    if (document.getElementById(newTodoListDayItemId)) {
      if (!document.getElementById(newTodoListItemId)) {
        document
          .getElementById(newTodoListDayItemId)
          .insertAdjacentHTML("beforeend", newTodoListItem);
      }
    } else {
      todoListContainer.insertAdjacentHTML("beforeend", newTodoListDayItem);

      if (!document.getElementById(newTodoListItemId)) {
        document
          .getElementById(newTodoListDayItemId)
          .insertAdjacentHTML("beforeend", newTodoListItem);
      }
    }
  });
}

function checkTodo(event) {
  const todoId = event.target.parentElement.id;
  const user = users.find((user) => user.username === currentUser);
  const userTodos = user.todos;
  const todo = userTodos.find((todo) => todoId == `todo${todo.id}`);

  event.target.parentElement.classList.toggle("checked");
  todo.checked = !todo.checked;
  localStorage.setItem("users", JSON.stringify(users));
}

function deleteTodo(event) {
  const todoId = event.target.parentElement.id;
  const user = users.find((user) => user.username === currentUser);
  const userTodos = user.todos;
  const todo = userTodos.find((todo) => todoId == `todo${todo.id}`);
  const todoContainerId = `#${event.target.parentElement.parentElement.id}`;
  const todoContainer = document.querySelector(todoContainerId);
  const todoIndex = userTodos.indexOf(todo);

  userTodos.splice(todoIndex, 1);

  localStorage.setItem("users", JSON.stringify(users));

  event.target.parentElement.remove();

  if (todoContainer.children.length === 1) {
    todoContainer.remove();
  }
}

function updateTodo(event) {
  const todoId = event.target.parentElement.id;
  const user = users.find((user) => user.username === currentUser);
  const userTodos = user.todos;
  const todo = userTodos.find((todo) => todoId == `todo${todo.id}`);
  const todoInput = event.target.parentElement.querySelector(".input");

  event.target.parentElement.classList.toggle("editing");

  if (!event.target.clickedOnce) {
    event.target.classList.add("active");

    if (todo.checked) {
      todo.checked = false;
      event.target.parentElement.classList.remove("checked");
    }

    event.target.clickedOnce = true;
  } else {
    todo.title = todoInput.value;
    localStorage.setItem("users", JSON.stringify(users));

    event.target.classList.remove("active");
    event.target.clickedOnce = false;
  }
}
