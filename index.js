// Obtener elementos del DOM
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addButton = document.getElementById('addButton');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const priorityFilter = document.getElementById('priorityFilter');
const filterButton = document.getElementById('filterButton');
const taskList = document.getElementById('taskList');

// Datos iniciales
let tasks = [];

// Función para agregar una tarea
function addTask() {
    const taskText = taskInput.value;
    const taskPriority = prioritySelect.value;
    if (taskText.trim() !== '') {
        const task = {
            text: taskText,
            priority: taskPriority
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

// Función para buscar tareas
function searchTasks() {
    const searchText = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText));
    renderTasks(filteredTasks);
}

// Función para filtrar tareas por prioridad
function filterTasks() {
    const selectedPriority = priorityFilter.value;
    if (selectedPriority === 'all') {
        renderTasks();
    } else {
        const filteredTasks = tasks.filter(task => task.priority === selectedPriority);
        renderTasks(filteredTasks);
    }
}

// Función para editar una tarea
function editTask(index) {
    const newTaskText = prompt('Ingrese el nuevo texto de la tarea:');
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        renderTasks();
    }
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Función para renderizar las tareas en el DOM
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
      <span>${task.text}</span>
      <span class="priority">(${task.priority})</span>
      <button class="editButton" onclick="editTask(${index})">Editar</button>
      <button class="deleteButton" onclick="deleteTask(${index})">Eliminar</button>
    `;
        taskList.appendChild(taskElement);
    });
}

// Asignar eventos a los botones
addButton.addEventListener('click', addTask);
searchButton.addEventListener('click', searchTasks);
filterButton.addEventListener('click', filterTasks);

// Renderizar las tareas iniciales
renderTasks();


