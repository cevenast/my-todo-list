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

// function auto_grow(element) {
//     element.style.height = "20px";
//     element.style.height = (element.scrollHeight)+"px";
// }