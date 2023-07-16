
class APIManager {
    constructor() {
        this.data = {}
    }

    _getUsersData() {
        return new Promise((resolve, reject) => {
            $.get(`https://randomuser.me/api/?results=7`, function(result) {
                resolve(result)
            })
        })
    }

    _getQuote() {
        return new Promise((resolve, reject) => {
            $.get(`https://api.kanye.rest`, function(result) {
                resolve(result)
            })
        })
    }

    _getAbout() {
        return new Promise((resolve, reject) => {
            $.get(`https://baconipsum.com/api/?type=meat-and-filler&paras=1`, function(result) {
                resolve(result)
            })
        })
    }

    _getPoke() {
        return new Promise((resolve, reject) => {
            $.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 949) + 1}`, function(result) {
                resolve(result)
            })
        })
    }

    fetchUserData () {
        return Promise.all([
            this._getUsersData(),
            this._getQuote(),
            this._getAbout(),
            this._getPoke()
        ]).then((data) => {
            const usersData = data[0].results
            this.data.userData = {
                first_name: usersData[0].name.first,
                last_name: usersData[0].name.last,
                city: usersData[0].location.city,
                state: usersData[0].location.state,
                img: usersData[0].picture.medium
            }
            this.data.friends = []
            for (let i = 1; i < usersData.length; i++) {
                this.data.friends.push(`${usersData[i].name.first} ${usersData[i].name.last}`)
            }
            this.data.quote = data[1].quote
            this.data.about = data[2][0]
            this.data.poke = {
                name: data[3].species.name,
                img: data[3].sprites.front_default  
            }
        })
    }
}
