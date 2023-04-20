const user = require('./schema')

const index = async (req, res) => {
    try {
        const users = req.params.id

        const topics = await user.findOne({ token: users })

        const username = topics.username.toUpperCase()
        const spliced = username.slice(0, 1)

        const all = {
            user: topics,

            role: topics.role,
            avatar: spliced
        }
        res.send(all);


    } catch (error) {
        console.log(error)

        res.send("login")
    }

}
const editUser = async (req, res) => {
    try {
        const users = req.params.id

        const topics = await user.findOne({ token: users })

        const username = topics.username.toUpperCase()
        const spliced = username.slice(0, 1)

        const all = {
            username: topics.username,
            id: topics._id,
            password: "12345",
            avatar: spliced,
            image: topics.image
        }
        res.send(all);


    } catch (error) {
        console.log(error)


    }

}
module.exports = { editUser, index };