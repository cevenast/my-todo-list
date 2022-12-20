document.querySelectorAll('.checked').forEach( checkbox => {
    checkbox.addEventListener('click', unmarkTask)
})

document.querySelectorAll('.not-checked').forEach(checkbox => {
    checkbox.addEventListener('click', markTask)
})

document.querySelectorAll('.fa-trash').forEach(checkbox => {
    checkbox.addEventListener('click', deleteTask)
})

async function markTask(){
    const itemName = this.parentNode.childNodes[3].value
    try{
        const response = await fetch('/markTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todoItem: itemName
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
    try{
        const itemName = this.parentNode.childNodes[3].value
        const response = await fetch('/unmarkTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todoItem: itemName
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
        const itemName = this.parentNode.childNodes[3].value
        const response = await fetch('/deleteTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todoItem: itemName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
