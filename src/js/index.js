const loginForm = document.querySelector(".login-form");
let users = JSON.parse(localStorage.getItem("users")) || [];

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameInput = document.querySelector("#usernameInput").value.trim();

    if (usernameInput.length == 0) {
      alert("Username cannot be empty");
      return;
    }

    const existingUser = users.find((user) => user.username === usernameInput);

    if (existingUser) {
      localStorage.setItem("user", JSON.stringify(existingUser.username));
    } else {
      const newUser = {
        username: usernameInput,
        todos: [],
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser.username));
    }

    window.location.href = "todo.html";
    alert(existingUser ? "Logged in successfully" : "User created & logged in");
  });
}
