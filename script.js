let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const quotes = [
  "Believe you can and you're halfway there.",
  "Your only limit is your mind.",
  "Push yourself, because no one else is going to do it for you.",
  "Do something today that your future self will thank you for.",
  "Dream it. Wish it. Do it.",
  "Success is not for the lazy.",
  "Small progress is still progress."
];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks based on filter
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(index);

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;

    // Priority badge
    const priority = document.createElement("span");
    priority.className = "priority " + task.priority;
    priority.textContent = task.priority.toUpperCase();

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(priority);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const input = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDateInput").value;
  const reminder = document.getElementById("reminderCheckbox").checked;
  const priority = document.getElementById("priorityInput").value;

  const taskText = input.value.trim();
  if (taskText === "") return;

  const newTask = {
    text: taskText,
    completed: false,
    dueDate,
    reminder,
    priority
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.value = "";
  document.getElementById("dueDateInput").value = "";
  document.getElementById("reminderCheckbox").checked = false;
  document.getElementById("priorityInput").value = "low";
}

// Toggle completed state
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Filter tasks
function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

// Show random quote
function newQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[random];
}

// Rotate quotes every 10 seconds
function startQuoteRotation() {
  newQuote(); // Show first quote immediately
  setInterval(newQuote, 10000); // Change quote every 10 seconds
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  // Start rotating quotes
  startQuoteRotation();

  // Attach Add Task button
  const addBtn = document.getElementById("addTaskBtn");
  addBtn.addEventListener("click", addTask);

  // Enter key to add task
  const input = document.getElementById("taskInput");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => filterTasks(btn.dataset.filter));
  });
});