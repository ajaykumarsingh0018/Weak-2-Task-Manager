function renderTasks(tasks, filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>
        ${task.text} 
        ${task.dueDate ? `<small>📅 ${task.dueDate}</small>` : ""}
        (${task.priority})
      </span>
      <div>
        <button data-id="${task.id}" class="complete">✔</button>
        <button data-id="${task.id}" class="delete">❌</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateStats(tasks);
}

function updateStats(tasks) {
  const stats = document.getElementById("task-stats");
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  stats.innerHTML = `
    Total: ${total} | Active: ${active} | Completed: ${completed}
  `;
}