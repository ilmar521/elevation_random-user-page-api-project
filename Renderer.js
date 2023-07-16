
Handlebars.registerHelper('capitalize', function(text) {
    if (typeof text === 'string') {
      let words = text.split(' ')
      let capitalizedWords = words.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      return capitalizedWords.join(' ')
    }
    return text
})

class Renderer {

    clearPage() {
        $('.user-container').empty()  
        $('.quote-container').empty() 
        $('.pokemon-container').empty() 
        $('.meat-container').empty() 
        $('.friends-container').empty()
    }

    rerenderLoadButton (usersArray) {
        $('.dropdown-menu').empty()
        const source = $('#users-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ user: usersArray });
        
        $('.dropdown-menu').append(newHTML);      
    }

    renderUserPage (user) {
        this.clearPage()

        //user info
        $('.user-container').append(`<img id="profile-pic" src="${user.userData.img}">`)
        const userInfo = $('<div class="user-info"></div>')
        $('.user-container').append(userInfo)
        $(userInfo).append(`<p>${user.userData.first_name} ${user.userData.last_name}</p>`)
        $(userInfo).append(`<p>${user.userData.state} ${user.userData.city}</p>`)

        const source = $('#friends-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ friend: user.friends });
        
        $('.friends-container').append(newHTML);

        //quote
        $('.quote-container').append(`<p>${user.quote}</p>`)

        //about
        $('.meat-container').append(`<p>${user.about}</p>`)

        //poke
        const sourcePoke = $('#pokemon-template').html();
        const templatePoke = Handlebars.compile(sourcePoke);
        const newHTMLPoke = templatePoke({ poke: [user.poke]});
        
        $('.pokemon-container').append(newHTMLPoke);

    }

}