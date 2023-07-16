class User {

    static _id = 0

    constructor(allUserData) {
        this.userData = allUserData.userData
        this.friends = allUserData.friends
        this.quote = allUserData.quote
        this.about = allUserData.about
        this.poke = allUserData.poke
        User._id++
        this.id = User._id
    }

}