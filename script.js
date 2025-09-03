
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


window.onload = loadTasks;


addBtn.addEventListener("click", addTask);


function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };


  saveTask(task);

 
  addTaskToUI(task);

  taskInput.value = "";
}


function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToUI(task));
}


function addTaskToUI(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) li.classList.add("completed");

  
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleTaskComplete(task.text);
  });

  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    li.remove();
    deleteTask(task.text);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}


function toggleTaskComplete(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(t => {
    if (t.text === taskText) t.completed = !t.completed;
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
