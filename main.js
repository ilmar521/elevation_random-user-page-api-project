const apiManager = new APIManager()
const renderer = new Renderer()

const usersArray = []
let currentUser = null

$('#generate_button').on('click', function () {
    apiManager.fetchUserData().then(() => {
        let user = new User(apiManager.data)
        currentUser = user
        renderer.renderUserPage(user)
    }).catch(error => {
        alert("Couldn't get data from API's!")
    });
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
    let userId = $(this).data('user-id')
    renderer.renderUserPage(usersArray.find(u => u.id == parseInt(userId))) 
})