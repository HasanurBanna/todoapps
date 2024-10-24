const add_btn =document.querySelector('#add_btn');
const newTaskInput = document.querySelector('#input_btn');
const tasksContainer = document.querySelector('#tasks');
const error = document.querySelector('#error');
const countvalue = document.querySelector('#count_value');
const output = document.querySelector('#output');

let taskCount = 0;

const displayCount = (taskCount) => {
    countvalue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none"
    if (!taskName) {
        setTimeout(() => {
            error.style.display ="block";
        }, 200);
        return;
    }

    newTaskInput.value = "";

    const task = `
    <div class="grid grid-cols-12 justify-center items-center p-3 rounded-md bg-white/20 font-semibold my-3 border-2">
        <input type="checkbox" id="task_check" class="col-span-1 cursor-pointer">
        <span id="taskname" class="col-span-7 text-blue-500 text-2xl">${taskName}</span>
   
        <button id="edit" class="col-span-2 bg-blue-500 px-3 py-1 rounded-md">
            <i class="fa-solid fa-pen-to-square cursor-pointer text-white"></i>
        </button>

        <button id="delete" class="col-span-2 bg-red-500 px-3 py-1 rounded-md ms-2 ">
         <i class="fa-solid fa-trash cursor-pointer text-white"></i>
        </button>
    </div>`;

    output.insertAdjacentHTML("beforeend",task)


    const deleteButtons = document.querySelectorAll('#delete');
    
    deleteButtons.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove()
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    const editButtons = document.querySelectorAll('#edit');
    editButtons.forEach(editbtn => {
        editbtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.idName == "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount)
        };
    });

    const tasksCheck = document.querySelectorAll("#task_check");
    tasksCheck.forEach(checkBox => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -= 1;
            }else{
                taskCount += 1;
            }
            displayCount(taskCount);
        };
    });

    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";

}

add_btn.addEventListener('click', addTask)

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
}
