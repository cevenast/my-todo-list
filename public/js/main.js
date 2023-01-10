// Task event listeners
    document.querySelectorAll('.checked').forEach( checkbox => {
        checkbox.addEventListener('click', unmarkTask)
    })

    document.querySelectorAll('.not-checked').forEach(checkbox => {
        checkbox.addEventListener('click', markTask)
    })

    document.querySelectorAll('.fa-trash').forEach(checkbox => {
        checkbox.addEventListener('click', deleteTask)
    })

    document.querySelectorAll('.task-update').forEach(checkbox => {
        checkbox.addEventListener('click', renameTask)
    })


//Tasks handlers

async function markTask(){
    const itemid = this.parentNode.childNodes[7].dataset.id
    const itemValue = this.parentNode.childNodes[7].value
    try{
        const response = await fetch('/todos/markTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: itemid,
                itemName: itemValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function unmarkTask(){
    const itemid = this.parentNode.childNodes[7].dataset.id
    const itemValue = this.parentNode.childNodes[7].value
    try{
        const response = await fetch('/todos/unmarkTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: itemid,
                itemName: itemValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteTask(){
    try{
        const itemid = this.parentNode.childNodes[7].dataset.id
        const itemValue = this.parentNode.childNodes[7].value
        const response = await fetch('/todos/deleteTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: itemid,
                itemName: itemValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function renameTask(){
    const itemid = this.parentNode.childNodes[7].dataset.id
    const itemValue = this.parentNode.childNodes[7].value
    try{
        const response = await fetch('/todos/renameTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: itemid,
                itemName: itemValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//Subtasks Event Listeners
document.querySelectorAll('.fa-circle-chevron-down').forEach(downarrow => {
    downarrow.addEventListener('click', appearSubtask)
})

document.querySelectorAll('.fa-xmark').forEach(x => {
    x.addEventListener('click', deleteSubtask)
})

document.querySelectorAll('.subtask-square').forEach(square => {
    square.addEventListener('click', markSubtask)
})

document.querySelectorAll('.st-update').forEach(update => {
    update.addEventListener('click', updateSubtask)
})

// Subtasks Handlers

function appearSubtask(){
    const itemid = this.parentNode.childNodes[7].dataset.id
    const ul = this.nextElementSibling.nextElementSibling.nextElementSibling
    const li = document.createElement('li')
    li.innerHTML = `<form class="subtask-write" action="/todos/addSubtask" method="POST"><input type="hidden" name="id" value="${itemid}" /><input class="submit-button" type="submit" value="+"><input class = "text-input" type="text" name="subtask" autofocus="on" required></form>`
    ul.appendChild(li)
}

async function deleteSubtask(){
    const ul = this.parentNode.parentNode
    const itemid = ul.previousElementSibling.previousElementSibling.dataset.id
    let allSubtasks = []
    let completedSubtasks = []

    const deletedSubtask = this.previousElementSibling.value
    for (let i = 1; i < ul.childElementCount*2; i+=2){
        if (ul.childNodes[i].childNodes[5].value != deletedSubtask){
            allSubtasks.push(ul.childNodes[i].childNodes[5].value)
            if (ul.childNodes[i].childNodes[5].classList.contains('completed')){
                completedSubtasks.push(ul.childNodes[i].childNodes[5].value)
            }
        }
    }

    try{
        const response = await fetch('/todos/deleteSubtask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: itemid,
                deletedSubtask: deletedSubtask,
                allSubtasks: allSubtasks,
                completedSubtasks: completedSubtasks
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markSubtask(){
    const ul = this.parentNode.parentNode
    const input = this.nextElementSibling.nextElementSibling
    const itemid = ul.previousElementSibling.previousElementSibling.dataset.id
    if (input.classList.contains('uncompleted')){
        input.classList.replace('uncompleted','completed')
    }
    else{
        input.classList.replace('completed','uncompleted')
    }

    let allSubtasks = []
    let completedSubtasks = []
    
    for (let i = 1; i < ul.childElementCount*2; i+=2){
        allSubtasks.push(ul.childNodes[i].childNodes[5].value)
        if (ul.childNodes[i].childNodes[5].classList.contains('completed')){
            completedSubtasks.push(ul.childNodes[i].childNodes[5].value)
        }
    }

    try{
        const response = await fetch('/todos/updateSubtask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: itemid,
                allSubtasks: allSubtasks,
                completedSubtasks: completedSubtasks
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function updateSubtask(){
    const ul = this.parentNode.parentNode
    const input = this.nextElementSibling.nextElementSibling
    const itemid = ul.previousElementSibling.previousElementSibling.dataset.id

    let allSubtasks = []
    let completedSubtasks = []
    
    for (let i = 1; i < ul.childElementCount*2; i+=2){
        allSubtasks.push(ul.childNodes[i].childNodes[5].value)
        if (ul.childNodes[i].childNodes[5].classList.contains('completed')){
            completedSubtasks.push(ul.childNodes[i].childNodes[5].value)
        }
    }

    try{
        const response = await fetch('/todos/updateSubtask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: itemid,
                allSubtasks: allSubtasks,
                completedSubtasks: completedSubtasks
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}





// function auto_grow(element) {
//     element.style.height = "20px";
//     element.style.height = (element.scrollHeight)+"px";
// }