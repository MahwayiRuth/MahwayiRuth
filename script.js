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

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(index);

    const span = document.createElement("span");
    span.textContent = task.text;

    // Priority Badge
    const priority = document.createElement("span");
    priority.className = "priority " + task.priority;
    priority.textContent = task.priority.toUpperCase();

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

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

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

// Quotes
function newQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[random];
}

// Load first quote
newQuote();