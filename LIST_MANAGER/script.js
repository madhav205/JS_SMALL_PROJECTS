let tasks = [];

function addTask(){
    let input = document.getElementById("taskInput");
    let text = input.value.trim();
    if(text === ""){
        alert("Enter a task");
        return;
    }
    tasks.push({
        name: text,
        completed: false
    });
    input.value = "";

    renderTasks();
}

function renderTasks(){

    let list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach((task,index)=>{

        let li = document.createElement("li");

        li.innerHTML = `
            <div class="task">
                <input type="checkbox"
                ${task.completed ? "checked":""}
                onchange="toggleTask(${index})">

                <span class="${task.completed ? "completed":""}">
                    ${task.name}
                </span>
            </div>

            <button class="delete-btn"
            onclick="deleteTask(${index})">
            </button>
        `;
        list.appendChild(li);
    });

    updateCounter();
}

function deleteTask(index){
    tasks.splice(index,1);

    renderTasks();
}

function removeLastTask(){

    if(tasks.length>0){
        tasks.pop();
       renderTasks();
    }}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
function updateCounter(){
    let remaining = tasks.filter(task => !task.completed).length;
    document.getElementById("counter").innerText =
        remaining + " Tasks Remaining";

}