const user = require('./schema')
const property = require('./PropertySchema')

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
const createProperties = async (req, res) => {
    try {
        const users = req.params.id
        const { title, value, unit, available, address, image } = req.body.user
        const topics = await user.findOne({ token: users })

        await property.create({
            userid: topics._id,
            title: title,
            value: value,
            unit: unit,
            available: available,
            address: address,
            image: req.body.url
        })
        res.send("done");


    } catch (error) {
        console.log(error)


    }

}
module.exports = { editUser, index, createProperties };