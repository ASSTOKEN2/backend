const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require('dotenv')
const { registerUser, loginUser, updateUser } = require("./LoginController")
const { editUser, index, createProperties } = require("./IndexController")


dotenv.config({ path: path.join(__dirname, './config.env') })

mongoose.connect('mongodb://127.0.0.1:27017/myapp').then(() => {
    console.log("DB Connected Successfully")
}).catch((err) => {
    console.log("Mongo not enabled locally")
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("DB Connected Successfully")
    }).catch((err) => {
        console.log("No internet connection")
        console.log(err)
    })
})




var whitelist = ['https://asstoken2.github.io', 'http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}
//  Middlewares

app.use(cors(corsOptions));

app.use(express.json()); DS - C36 - 1936766762 - 1867

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('changed')
})
app.post('/register-user', registerUser);

app.post("/login-user", loginUser);
app.post("/createpro", createProperties);
app.get("/index/:id", index);
app.get("/edit-user/:id", editUser);
app.put("/update-user/:id", updateUser);









// Port
const port = 2500;
app.listen(port, () => {
    console.log("Server running on port " + port);
});