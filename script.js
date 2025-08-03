const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load saved tasks
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(addTask);
};

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTasks();
    taskInput.value = '';
  }
});

function addTask(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);

  taskList.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach((li) => {
    tasks.push(li.textContent.replace(/✔🗑$/, '').trim());
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
