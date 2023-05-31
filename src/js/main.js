const body = document.querySelector("body");
const addTodoButton = document.querySelector(".add-todo");
const addTodoModal = document.querySelector(".add-todo-modal");
const addTodoModalCancel = document.querySelector(".add-todo-modal__cancel");

addTodoButton.addEventListener("click", () => {
  addTodoModal.classList.add("active");
  body.classList.add("overflow-hidden");
});

addTodoModalCancel.addEventListener("click", () => {
  addTodoModal.classList.remove("active");
  body.classList.remove("overflow-hidden");
});
