const bcrypt = require("bcrypt");
const user = require('./schema')
const path = require('path')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../config.env') })






// Creates a user
const registerUser = async (req, res) => {
    try {

        const body = req.body;


        const oldEmail = await user.findOne({ email: body.email });
        const oldUser = await user.findOne({ username: body.username });
        if (oldEmail) {
            const email = body.email
            const error = email + 'is already in use'
            res.send(error)
        }

        else if (oldUser) {
            const username = body.username
            const error = username + 'is already in use'
            res.send(error)
        }

        else {

            if (body.email == process.env.EMAIL && body.password == process.env.PASSWORD) {
                const saltround = 10


                const encryptedUserPassword = await bcrypt.hash(body.password, saltround);

                await user.create({
                    username: body.username,
                    password: encryptedUserPassword,
                    role: "Admin",
                    email: body.email,
                    image: ""
                });


                const token = jwt.sign(
                    { user_id: user._id, email: body.email },
                    process.env.ADMIN_KEY,
                    {
                        expiresIn: "3d"
                    }
                );


                const tokenname = await user.findOneAndUpdate({ email: req.body.email }, { token: token })
                const Get = await user.findOne({ email: req.body.email })


                res.send(token)
                console.log("user added")
            }

            else {
                const saltround = 10

                const encryptedUserPassword = await bcrypt.hash(body.password, saltround);


                await user.create({
                    username: body.username,
                    password: encryptedUserPassword,
                    role: "User",
                    email: body.email,
                    image: ""
                });


                const token = jwt.sign(
                    { user_id: user._id, email: body.email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "3d"
                    }
                );


                const tokenname = await user.findOneAndUpdate({ email: req.body.email }, { token: token })
                const Get = await user.findOne({ email: req.body.email })





                res.send(token)
                console.log('user added')
            }
        }
    }


    catch (err) {
        console.log(err)
    }

}

// Sign in to a user
const loginUser = async (req, res, next) => {


    try {
        const body = req.body

        const users = await user.findOne({ email: body.email });

        if (users) {

            if (body.email == process.env.EMAIL && body.password == process.env.PASSWORD) {
                if (bcrypt.compareSync(body.password, users.password)) {


                    const token = jwt.sign(
                        { users_id: users._id, email: req.body.email },
                        process.env.ADMIN_KEY,
                        {
                            expiresIn: "5h"
                        }
                    );

                    const tokenname = await user.findOneAndUpdate({ email: req.body.email }, { token: token })
                    const Get = await user.findOne({ email: req.body.email })


                    res.send(token)

                        ;
                }

                else {

                    const error = "invalid Password"
                    res.send(error);
                }
            }

            else if (body.email !== process.env.EMAIL && body.password !== process.env.PASSWORD) {
                if (bcrypt.compareSync(body.password, users.password)) {


                    const token = jwt.sign(
                        { users_id: users._id, email: req.body.email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "5h"
                        }
                    );


                    const tokenname = await user.findOneAndUpdate({ email: req.body.email }, { token: token })
                    const Get = await user.findOne({ email: req.body.email })


                    res.send(token)



                }
                else {
                    const error = "invalid Password"
                    res.send(error);
                }
            } else {
                console.log("error")
            }

        }
        else {
            const error = "invalid user"
            res.send(error);
        }
    } catch (error) {

        res.send(error)
    }

}

const updateUser = async (req, res) => {
    try {
        const users = req.params.id
        const { username, } = req.body.user
        const topics = await user.findOneAndUpdate({ token: users }, { username: username, image: req.body.url })




        res.send('updated');


    } catch (error) {
        console.log(error)

        res.send("login")
    }

}





module.exports = { registerUser, loginUser, updateUser };