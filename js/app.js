let tasks = loadTasks();
let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  renderTasks(tasks, currentFilter);
});

document.getElementById("task-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const textInput = document.getElementById("task-input");
  const text = textInput.value.trim();
  if (!text) return;

  const newTask = {
    id: generateId(),
    text,
    completed: false,
    dueDate: document.getElementById("due-date").value,
    priority: document.getElementById("priority").value
  };

  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks(tasks, currentFilter);
  this.reset();
});

document.getElementById("task-list").addEventListener("click", function(e) {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("delete")) {
    tasks = tasks.filter(task => task.id !== id);
  }

  if (e.target.classList.contains("complete")) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }

  saveTasks(tasks);
  renderTasks(tasks, currentFilter);
});

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", function() {
    currentFilter = this.dataset.filter;
    renderTasks(tasks, currentFilter);
  });
});

document.getElementById("clear-completed").addEventListener("click", function() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks(tasks);
  renderTasks(tasks, currentFilter);
});

document.getElementById("theme-toggle").addEventListener("click", function() {
  document.body.classList.toggle("dark");
});