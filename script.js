const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = () => {
  tasks.forEach(renderTask);
  checkReminders();
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text,
    completed: false,
    dueDate: prompt("Enter due date (YYYY-MM-DD) or leave blank:")
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  li.className = task.completed ? "completed" : "";

  li.innerHTML = `
    <span ondblclick="editTask(this)">${task.text} ${task.dueDate ? "- Due: " + task.dueDate : ""}</span>
    <button onclick="toggleComplete(this)">✔</button>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  taskList.appendChild(li);
}

function deleteTask(button) {
  const li = button.parentElement;
  const id = Number(li.getAttribute("data-id"));
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  li.remove();
}

function toggleComplete(button) {
  const li = button.parentElement;
  const id = Number(li.getAttribute("data-id"));
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  saveTasks();
  li.classList.toggle("completed");
}

function editTask(span) {
  const li = span.parentElement;
  const id = Number(li.getAttribute("data-id"));
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);
  if (newText !== null) {
    task.text = newText;
    saveTasks();
    taskList.innerHTML = "";
    tasks.forEach(renderTask);
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    const lis = taskList.querySelectorAll("li");
    lis.forEach(li => {
      const id = Number(li.getAttribute("data-id"));
      const task = tasks.find(t => t.id === id);
      if (
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed)
      ) {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
    });
  });
});

function checkReminders() {
  const today = new Date().toISOString().split("T")[0];
  tasks.forEach(task => {
    if (task.dueDate && task.dueDate <= today && !task.completed) {
      alert(`Reminder: Task "${task.text}" is due today or overdue!`);
    }
  });
}
