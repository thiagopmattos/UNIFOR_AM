document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("task-input");
    var addTaskBtn = document.getElementById("add-task-btn");
    var taskList = document.getElementById("task-list");

    // Função para adicionar nova tarefa
    function addTask(taskText) {
        if (taskText === "") {
            alert("Digite uma tarefa!");
            return;
        }

        // Cria o elemento da nova tarefa
        var newTask = document.createElement("li");
        newTask.innerHTML = `
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="complete-btn">Concluir</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;

        // Adiciona o novo item à lista
        taskList.appendChild(newTask);

        // Adiciona eventos aos botões Concluir e Excluir
        var completeBtn = newTask.querySelector(".complete-btn");
        var deleteBtn = newTask.querySelector(".delete-btn");

        completeBtn.addEventListener("click", function() {
            newTask.classList.toggle("completed");
        });

        deleteBtn.addEventListener("click", function() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskList.removeChild(newTask);
        });
    }

    // Evento de clique no botão Adicionar Tarefa
    addTaskBtn.addEventListener("click", function() {
        var taskText = taskInput.value;
        var task = {task: taskText}

        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTask(taskText);
        taskInput.value = ""; // Limpa o campo de entrada
    });

    // Também permite adicionar tarefa pressionando Enter no campo de texto
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            var taskText = taskInput.value;
            addTask(taskText);
            taskInput.value = ""; // Limpa o campo de entrada
        }
    });

    function loadTask(){
        const keys = Object.keys(localStorage);
        keys.map(key => {
            var task_item = localStorage.getItem(key)
            var taskText = JSON.parse(task_item).task;
            addTask (taskText);
        });
    }

    async function tasksApiFetch() {
        try {
            const response = await fetch(`${apiURL}/tasks`);
            const tasks = await response.json();
            console.log(tasks)
        } catch (err) {
            console.log(err.message)
        }
    }

    loadTask();
    tasksApiFetch();
});
