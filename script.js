let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

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
    span.style.marginLeft = "0.5rem";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDateInput").value;
  const reminder = document.getElementById("reminderCheckbox").checked;

  const taskText = input.value.trim();
  if (taskText === "") return;

  const newTask = {
    text: taskText,
    completed: false,
    dueDate,
    reminder
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.value = "";
  document.getElementById("dueDateInput").value = "";
  document.getElementById("reminderCheckbox").checked = false;
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

renderTasks();
