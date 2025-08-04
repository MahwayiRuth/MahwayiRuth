// Get DOM elements const taskInput = document.getElementById("taskInput"); const dueDateInput = document.getElementById("dueDate"); const taskList = document.getElementById("taskList"); const filterButtons = document.querySelectorAll(".filter button");

// Load tasks from localStorage on page load window.addEventListener("load", () => { const tasks = JSON.parse(localStorage.getItem("tasks")) || []; tasks.forEach(task => renderTask(task)); checkReminders(); });

// Save tasks to localStorage function saveTasks() { const tasks = []; document.querySelectorAll("#taskList li").forEach(li => { const text = li.querySelector("span").textContent; const date = li.getAttribute("data-date"); const completed = li.classList.contains("completed"); tasks.push({ text, date, completed }); }); localStorage.setItem("tasks", JSON.stringify(tasks)); }

// Add task function addTask() { const text = taskInput.value.trim(); const date = dueDateInput.value; if (!text || !date) return; const task = { text, date, completed: false }; renderTask(task); saveTasks(); taskInput.value = ""; dueDateInput.value = ""; }

// Render task function renderTask(task) { const li = document.createElement("li"); li.setAttribute("data-date", task.date); if (task.completed) li.classList.add("completed"); li.innerHTML = <span ondblclick="editTask(this)">${task.text}</span> <small>Due: ${task.date}</small> <button onclick="toggleComplete(this)">✓</button> <button onclick="deleteTask(this)">Delete</button>; taskList.appendChild(li); }

// Delete task function deleteTask(button) { button.parentElement.remove(); saveTasks(); }

// Toggle complete function toggleComplete(button) { const li = button.parentElement; li.classList.toggle("completed"); saveTasks(); }

// Edit task function editTask(span) { const newText = prompt("Edit task:", span.textContent); if (newText !== null) { span.textContent = newText; saveTasks(); } }

// Filter tasks filterButtons.forEach(btn => { btn.addEventListener("click", () => { const filter = btn.dataset.filter; document.querySelectorAll("#taskList li").forEach(li => { if (filter === "all") li.style.display = ""; else if (filter === "active") li.style.display = li.classList.contains("completed") ? "none" : ""; else if (filter === "completed") li.style.display = li.classList.contains("completed") ? "" : "none"; }); }); });

// Reminder check function checkReminders() { const now = new Date().toISOString().split("T")[0]; document.querySelectorAll("#taskList li").forEach(li => { const date = li.getAttribute("data-date"); const text = li.querySelector("span").textContent; if (date === now && !li.classList.contains("completed")) { alert(Reminder: Task "${text}" is due today!); } }); }

