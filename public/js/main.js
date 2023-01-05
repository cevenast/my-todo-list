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

    document.querySelectorAll('.fa-arrows-rotate').forEach(checkbox => {
        checkbox.addEventListener('click', renameTask)
    })

// Subtasks event listeners
    document.querySelectorAll('.fa-circle-chevron-down').forEach(downarrow => {
        downarrow.addEventListener('click', appearSubtask)
    })


//Tasks handlers

async function markTask(){
    const itemid = this.parentNode.childNodes[7].dataset.id
    const itemValue = this.parentNode.childNodes[7].value
    try{
        const response = await fetch('/markTask', {
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
        const response = await fetch('/unmarkTask', {
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
        const response = await fetch('/deleteTask', {
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
        const response = await fetch('/renameTask', {
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

// Subtasks Handlers

function appearSubtask(){
    const itemid = this.parentNode.childNodes[7].dataset.id
    const ul = this.nextElementSibling.nextElementSibling
    const li = document.createElement('li')
    li.innerHTML = `<form class="subtask-write" action="/addSubtask" method="POST"><input type="hidden" name="id" value="${itemid}" /><input class="submit-button" type="submit" value="+"><input class = "text-input uncompleted" type="text" name="subtask"></form>`
    ul.appendChild(li)
}




// function auto_grow(element) {
//     element.style.height = "20px";
//     element.style.height = (element.scrollHeight)+"px";
// }