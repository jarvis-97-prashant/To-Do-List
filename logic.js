let inputBox = document.querySelector('#inputbox');
const addbtn = document.querySelector('#addBtn')
const listContainer = document.querySelector('.list-container')

let editTodo = null;
let arr = []

function AddTask() {
    let inputText = inputBox.value;

    if (inputText.length <= 0) {
        alert("Write something")
    }
    else if (addbtn.innerHTML === "Edit") {
        let BeforeEditValue = editTodo.target.previousElementSibling.innerHTML;
        editTodo.target.previousElementSibling.innerHTML = inputText
        updateItemInLocal(editTodo.target.previousElementSibling.innerHTML, BeforeEditValue) 
        addbtn.innerHTML = "ADD"
        inputBox.value = ""
    }
    else {
        const listItems = document.createElement("li")
        const p = document.createElement('p')
        p.setAttribute('class', 'Done')

        p.innerHTML = inputText;
        listItems.appendChild(p)

        const editbtn = document.createElement('button')
        editbtn.innerHTML = "Edit"
        editbtn.classList.add('btn', 'editbtn')
        listItems.appendChild(editbtn);

        const delbtn = document.createElement('button')
        delbtn.innerHTML = "Delete"
        delbtn.classList.add('btn', 'delbtn')
        listItems.appendChild(delbtn)

        listContainer.appendChild(listItems);
        inputBox.value = ""
        saveList(inputText, false);
    }
}

function taskDone(para) {
    para.parentElement.children[0].classList.toggle('notDone')
    updateDoneStatusInLocal(para.innerHTML, para.parentElement.children[0].classList.contains('notDone'))
}

function update(e) {
    if (e.target.innerHTML === "Delete") {
        delItemFromLocal(e.target.parentElement)
        listContainer.removeChild(e.target.parentElement)
    }
    else if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML
        inputBox.focus();
        addbtn.innerHTML = "Edit"
        editTodo = e;
    }
    else {
        taskDone(e.target);
    }
}

listContainer.addEventListener('click', update);

function saveList(data, isDone) {
    if (localStorage.getItem("todos") === null) {
        arr = []
    }
    else {
        arr = JSON.parse(localStorage.getItem("todos"))
    }
    arr.push({text: data, done: isDone});
    localStorage.setItem("todos", JSON.stringify(arr));
}

function reload() {
    if (localStorage.getItem("todos") === null) {
        arr = []
    }
    else {
        arr = JSON.parse(localStorage.getItem("todos"))

        arr.forEach(item => {
            const listItems = document.createElement("li")
            const p = document.createElement('p')
            p.setAttribute('class', item.done ? 'Done notDone' : 'Done')

            p.innerHTML = item.text;
            listItems.appendChild(p)

            const editbtn = document.createElement('button')
            editbtn.innerHTML = "Edit"
            editbtn.classList.add('btn', 'editbtn')
            listItems.appendChild(editbtn);

            const delbtn = document.createElement('button')
            delbtn.innerHTML = "Delete"
            delbtn.classList.add('btn', 'delbtn')
            listItems.appendChild(delbtn)

            listContainer.appendChild(listItems);
        });
    }
}

function delItemFromLocal(delItem) {
    if (localStorage.getItem("todos") === null) {
        arr = []
    }
    else {
        arr = JSON.parse(localStorage.getItem("todos"))
    }
    let text = delItem.children[0].innerHTML
    let textIndex = arr.findIndex(item => item.text === text)
    
    arr.splice(textIndex, 1)
    localStorage.setItem("todos", JSON.stringify(arr))
}

function updateItemInLocal(updateItem, previousValue) {
    arr = JSON.parse(localStorage.getItem("todos"))
    let updateItemIndex = arr.findIndex(item => item.text === previousValue)
    arr[updateItemIndex].text = updateItem;

    localStorage.setItem("todos", JSON.stringify(arr))
}

function updateDoneStatusInLocal(text, isDone) {
    arr = JSON.parse(localStorage.getItem("todos"))
    let updateItemIndex = arr.findIndex(item => item.text === text)
    arr[updateItemIndex].done = isDone;

    localStorage.setItem("todos", JSON.stringify(arr))
}

// Call reload function when the page loads
window.onload = reload;