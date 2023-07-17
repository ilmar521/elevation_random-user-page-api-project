class APIManager {
    constructor() {
        this.data = {}
    }

    _getAPIdata(url) {
        return new Promise((resolve, reject) => {
            $.get(url, function (result) {
                resolve(result)
            })
        })
    }

    async fetchUserData() {
        const usersDataPromise = this._getAPIdata(
            `https://randomuser.me/api/?results=7`
        )
        const quotePromise = this._getAPIdata(`https://api.kanye.rest`)
        const aboutPromise = this._getAPIdata(
            `https://baconipsum.com/api/?type=meat-and-filler&paras=1`
        )
        const pokePromise = this._getAPIdata(
            `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 949) + 1}`
        )
        return Promise.all([
            usersDataPromise,
            quotePromise,
            aboutPromise,
            pokePromise,
        ]).then((data) => {
            const usersData = data[0].results;
            this.data.userData = {
                first_name: usersData[0].name.first,
                last_name: usersData[0].name.last,
                city: usersData[0].location.city,
                state: usersData[0].location.state,
                img: usersData[0].picture.medium,
            }
            this.data.friends = []
            for (let i = 1; i < usersData.length; i++) {
                this.data.friends.push(
                    `${usersData[i].name.first} ${usersData[i].name.last}`
                )
            }
            this.data.quote = data[1].quote
            this.data.about = data[2][0]
            this.data.poke = {
                name: data[3].species.name,
                img: data[3].sprites.front_default,
            };
        });
    }
}
