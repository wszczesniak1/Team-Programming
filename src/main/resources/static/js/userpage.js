function addTask() {
    var taskInput = document.getElementById("taskInput").value.trim();
    var dateInput = document.getElementById("dateInput").value;
    var timeInput = document.getElementById("timeInput").value;
    var locationInput = document.getElementById("locationInput").value.trim();

    if (taskInput !== "") {
        var taskContainer = document.getElementById("taskContainer");
        var taskElement = document.createElement("div");
        taskElement.classList.add("task");

        var taskContent = `<strong>${taskInput}</strong>`;
        if (dateInput) {
            taskContent += `<br>Date: ${dateInput}`;
        }
        if (timeInput) {
            taskContent += `<br>Time: ${timeInput}`;
        }
        if (locationInput) {
            taskContent += `<br>Location: ${locationInput}`;
        }

        taskElement.innerHTML = taskContent;

        taskContainer.appendChild(taskElement);

        document.getElementById("taskInput").value = "";
        document.getElementById("dateInput").value = "";
        document.getElementById("timeInput").value = "";
        document.getElementById("locationInput").value = "";
    }
}