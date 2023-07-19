const userDataManager = new UserDataManager()
const renderer = new Renderer()

$('#generate_button').on('click', async function () {
    try {
        await userDataManager.fetchUserDataFromAPI()
        renderer.renderUserPage(userDataManager.getCurrentUser())      
    } catch (error) {
        console.log(error)
        alert("Couldn't get data from API's!")   
    }   
})

$('#save_button').on('click', function () {
    if (userDataManager.checkCurrentUserExist()) {
        if (userDataManager.checkCurrentUserAlreadyAdded()) {
            alert("This user already have saved!")
        } else {
            userDataManager.addCurrentUserToStorage()   
            renderer.rerenderLoadButton(userDataManager.getUsersArray()) 
        }
    } else {
        alert("You have to generate user before saving!")
    }
})

$('.dropdown-menu').on('click', '.dropdown-item', function () {
    userDataManager.setCurrentUser(parseInt($(this).data('user-id')))
    renderer.renderUserPage(userDataManager.getCurrentUser()) 
})