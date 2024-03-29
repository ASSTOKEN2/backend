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





var corsOptions = {
    origin: ['https://asstoken2.github.io', 'http://localhost:3000'],
    credentials: true,
    optionSuccessStatus: 200
}
//  Middlewares

app.use(cors(corsOptions));

app.use(express.json());

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