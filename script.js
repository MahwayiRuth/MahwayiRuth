// Save tasks in localStorage
function saveTasks() {
  const tasks = Array.from(document.querySelectorAll("#taskList li")).map((li) => {
    return {
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on page load
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach(task => {
    addTask(task.text, task.completed);
  });
}

function addTask(text = null, completed = false) {
  const input = document.getElementById("taskInput");
  const taskText = text || input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

function applyFilter(filter) {
  const tasks = document.querySelectorAll("#taskList li");
  tasks.forEach((li) => {
    li.style.display = "block";
    if (filter === "active" && li.classList.contains("completed")) {
      li.style.display = "none";
    } else if (filter === "completed" && !li.classList.contains("completed")) {
      li.style.display = "none";
    }
  });
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    applyFilter(filter);
  });
});

window.onload = loadTasks;
