
// Get DOM elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// Load tasks from localStorage on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
  checkReminders();
};

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed"),
      dueDate: li.getAttribute("data-dueDate"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  const dueDate = prompt("Enter due date (YYYY-MM-DD HH:mm):");
  const task = { text, completed: false, dueDate };
  renderTask(task);
  saveTasks();
  taskInput.value = "";
}

// Render task
function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-dueDate", task.dueDate || "");

  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${task.text}</span>
    <small>${task.dueDate ? "⏰ " + task.dueDate : ""}</small>
    <button onclick="editTask(this)">✏️</button>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  taskList.appendChild(li);
}

// Delete task
function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

// Toggle complete
function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

// Edit task
function editTask(button) {
  const li = button.parentElement;
  const newText = prompt("Edit your task:", li.querySelector("span").innerText);
  if (newText !== null) {
    li.querySelector("span").innerText = newText;
    saveTasks();
  }
}

// Filter tasks
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll("#taskList li").forEach(li => {
      if (
        filter === "all" ||
        (filter === "active" && !li.classList.contains("completed")) ||
        (filter === "completed" && li.classList.contains("completed"))
      ) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  });
});

// Reminder check
function checkReminders() {
  setInterval(() => {
    const now = new Date();
    document.querySelectorAll("#taskList li").forEach(li => {
      const due = li.getAttribute("data-dueDate");
      if (due && !li.classList.contains("completed")) {
        const dueTime = new Date(due);
        if (now >= dueTime) {
          alert("Reminder: " + li.querySelector("span").innerText);
          li.removeAttribute("data-dueDate");
          saveTasks();
        }
      }
    });
  }, 60000); // check every 60 seconds
}
