class User {
    static _id = 0

    constructor(allUserData) {
        this.userData = allUserData.userData
        this.friends = allUserData.friends
        this.quote = allUserData.quote
        this.about = allUserData.about
        this.poke = allUserData.poke
        this.bgColor = allUserData.bgColor
        User._id++
        this.id = User._id
    }
}

class APIManager {
    constructor() {
        this._urls = [
            `https://randomuser.me/api/?results=7`,
            `https://api.kanye.rest`,
            `https://baconipsum.com/api/?type=meat-and-filler&paras=1`,
            `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 949) + 1}`   
        ]
    }

    getAPIdata(url) {
        return new Promise((resolve, reject) => {
            $.get(url, function (result) {
                resolve(result)
            })
        })
    }

    fetchUserData() {
        return Promise.all(this._urls.map(url => this.getAPIdata(url)))   
    }
}

class UserDataManager {
    constructor() {
        this.users = []
        this.currentUser = null
        this.colorsModel = {
            fire: '#FA8072',
            rock: '#808000',
            ground: '#8B4513',
            water: '#00FFFF',
            grass: '#00FF00',   
            ice: '#1E90FF'        
        }
        this.defaultColor = '#ecf0f1'
    }

    setCurrentUser (id) {
        this.currentUser = this.users.find(u => u.id == id)    
    }

    getCurrentUser () {
        return this.currentUser
    }
    getUsersArray () {
        return [...this.users]
    }

    checkCurrentUserAlreadyAdded () {
        return this.users.findIndex(u => u.id == this.currentUser.id) != -1
    }

    checkCurrentUserExist () {
        return this.currentUser != null   
    }

    addCurrentUserToStorage () {
        this.users.push(this.currentUser)
    }

    async fetchUserDataFromAPI () {
        const apiManager = new APIManager()
        const dataFromAPI = await apiManager.fetchUserData()
        const newUserData = {}
        const randomUsersData = dataFromAPI[0].results;
        newUserData.userData = {
            first_name: randomUsersData[0].name.first,
            last_name: randomUsersData[0].name.last,
            city: randomUsersData[0].location.city,
            state: randomUsersData[0].location.state,
            img: randomUsersData[0].picture.medium,
        }
        newUserData.friends = randomUsersData.slice(1).map(user => `${user.name.first} ${user.name.last}`)
        newUserData.quote = dataFromAPI[1].quote
        newUserData.about = dataFromAPI[2][0]
        newUserData.poke = {
            name: dataFromAPI[3].species.name,
            img: dataFromAPI[3].sprites.front_default,
            type: dataFromAPI[3].types[0].type.name
        }
        newUserData.bgColor = this.colorsModel[newUserData.poke.type] === undefined ? this.defaultColor : this.colorsModel[newUserData.poke.type]

        const giphyData = await apiManager.getAPIdata(`http://api.giphy.com/v1/gifs/search?q=pokemon+${newUserData.poke.name}&api_key=4OERPiFQVFPIgF4PODJLS3jtMInz5LOH`)
        newUserData.poke.gifUrl = giphyData.data[0].images.fixed_height.url

        this.currentUser = new User(newUserData)
    }    
}