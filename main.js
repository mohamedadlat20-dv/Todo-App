// The Selectors Of Our Application
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks"); // tasks container
let deleteAllBtn = document.querySelector(".delete-all");

// Array Of Tasks
let arrayOfTasks = [];

// Trigger Get Data Fronm Local Storage
getDataFromLocalStorage();

submit.onclick = function () {
    if (input.value !== "") {
        // Add Task To Array Of Tasks
        addTaskToArray(input.value);
        input.value = ""; // Empty Input Field
    } else {
        console.log(`empty`); // for just check
    }
};
// Click On Task Element
tasks.addEventListener('click', (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remeve Element From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        // Remove Element From Tasks
        e.target.parentElement.remove();
        }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Togle Done Class
        e.target.classList.toggle("done");
    }
})


function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
};

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks
    tasks.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach(task => {
        // create the div inside arrayOfTasks with class + attr
        let div = document.createElement("div");
        div.classList = "task";
        // Check If Task Is Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        // append the input.value (task.title: taskText)
        div.appendChild(document.createTextNode(task.title));
        //Create the span (delete btn)
        let span = document.createElement("span");
        span.className = "del";
        // Append btn to div
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        console.log(div);
        // Add Task Div To Tasks Container
        tasks.appendChild(div);
    });
};
// Add Data to Local Storage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};
// Get Data Fronm Local Storage
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        arrayOfTasks = JSON.parse(data);
        addElementsToPageFrom(arrayOfTasks);
    }
}

// Delete Task with task id from Local Storage Function
function deleteTaskWith(taskId) {
    // For Testing
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`)
    // }

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}
// Toggle Task Element With task id from Local Storage Function
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
        addDataToLocalStorageFrom(arrayOfTasks)
    }
};

deleteAllBtn.onclick = function () {
    arrayOfTasks = [];
    addDataToLocalStorageFrom(arrayOfTasks);
    addElementsToPageFrom(arrayOfTasks);
};