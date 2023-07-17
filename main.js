const apiManager = new APIManager()
const renderer = new Renderer()

const usersArray = []
let currentUser = null

$('#generate_button').on('click', async function () {
    try {
        await apiManager.fetchUserData()
        currentUser = new User(apiManager.data)
        renderer.renderUserPage(currentUser)      
    } catch (error) {
        alert("Couldn't get data from API's!")   
    }   
})

$('#save_button').on('click', function () {
    if (currentUser != null) {
        if (usersArray.findIndex(u => u.id == currentUser.id) != -1) {
            alert("This user already have saved!")
        } else {
            usersArray.push(currentUser)   
            renderer.rerenderLoadButton(usersArray) 
        }
    } else {
        alert("You have to generate user before saving!")
    }
})

$('.dropdown-menu').on('click', '.dropdown-item', function () {
    renderer.renderUserPage(usersArray.find(u => u.id == parseInt($(this).data('user-id')))) 
})