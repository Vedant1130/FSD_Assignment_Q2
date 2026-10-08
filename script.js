const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();

    // Do not add an empty task
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create the list item
    const taskItem = document.createElement("li");
    taskItem.classList.add("task");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    // Create task text
    const text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "✕";
    deleteButton.setAttribute("aria-label", "Delete task");

    // Add elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(text);
    taskItem.appendChild(deleteButton);

    // Add task item to the list
    taskList.appendChild(taskItem);

    // Clear input
    taskInput.value = "";
    taskInput.focus();

    // Mark task as completed
    checkbox.addEventListener("change", function () {

        if (checkbox.checked) {
            taskItem.classList.add("completed");
        } else {
            taskItem.classList.remove("completed");
        }

        updateTaskCount();
    });

    // Delete task
    deleteButton.addEventListener("click", function () {
        taskItem.remove();
        updateTaskCount();
        updateEmptyMessage();
    });

    updateTaskCount();
    updateEmptyMessage();
}

// Update task count
function updateTaskCount() {

    const tasks = document.querySelectorAll(".task");
    const remainingTasks =
        document.querySelectorAll(".task:not(.completed)");

    if (tasks.length === 1) {
        taskCount.textContent = "1 task";
    } else {
        taskCount.textContent = `${remainingTasks.length} tasks`;
    }
}

// Show or hide empty message
function updateEmptyMessage() {

    const tasks = document.querySelectorAll(".task");

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Clear all completed tasks
function clearCompletedTasks() {

    const completedTasks =
        document.querySelectorAll(".task.completed");

    completedTasks.forEach(function (task) {
        task.remove();
    });

    updateTaskCount();
    updateEmptyMessage();
}

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter is pressed
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }
});

// Clear completed tasks
clearCompletedBtn.addEventListener(
    "click",
    clearCompletedTasks
);

// Initial state
updateEmptyMessage();