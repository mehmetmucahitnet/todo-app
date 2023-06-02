const body = document.querySelector("body");
const addTodoButton = document.querySelector(".add-todo");
const addTodoModal = document.querySelector(".add-todo-modal");
const addTodoModalCancel = document.querySelector(".add-todo-modal__cancel");
const addTodoModalForm = document.querySelector(".add-todo-modal__form");
const todoListContainer = document.querySelector(".todo-list-container");
const users = JSON.parse(localStorage.getItem("users"));
const currentUser = JSON.parse(localStorage.getItem("user"));

window.onload = () => {
  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    const userr = users.find((user) => user.username === currentUser);
    console.log(userr, currentUser);
    const userTodos = userr.todos;
    console.log(userTodos);
    listTodos(userTodos);
  }
};

// let todos = currentUser.todos || [];
// currentUser.todos = todos;

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

    if (todoInput === "" || todoDate === "") {
      alert("todo title or date cannot be empty");
    } else {
      // yeni todo oluşturuldu ve localstorage'a kaydedildi
      const todo = {
        id: Date.now(),
        title: todoInput,
        date: todoDate,
        checked: false,
      };

      const user = users.find((user) => user.username === currentUser);
      console.log(user, currentUser);
      user.todos.push(todo);
      localStorage.setItem("users", JSON.stringify(users));

      // yeni todo ekrana yazıldı
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
          <button type="button" class="check"><i class="icon-check"></i></button>
          <input type="text" class="input" value="${todo.title}">
          <button type="button" class="edit update"><i class="icon-pen"></i></button>
          <button type="button" class="delete"><i class="icon-trash"></i></button>
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

  // for (let i = 0; i < todos.length; i++) {
  //   const todo = todos[i];

  // }
}
