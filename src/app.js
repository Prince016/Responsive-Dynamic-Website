// require('dotenv').config();
const express = require("express")
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const User = require("./models/usermessage");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser")
// const auth = require("./middleware/auth");
const port = process.env.PORT || 3000;




// setting the path

const static_Path = path.join(__dirname, "../public")
const templates_Path = path.join(__dirname, "../templates/views")
const partials_Path = path.join(__dirname, "../templates/partials")



// middleware 
app.use(express.urlencoded({ extended: false }))
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.static(static_Path))
app.set("view engine", "hbs");

app.set("views", templates_Path);

//  for tell that we are using hbs partials files 
hbs.registerPartials(partials_Path);



//  routing 
// app.get(path,callback)
app.get("/", (req, res) => {
    res.render("index");
})


app.post("/contact", async (req, res) => {
    try {
        //    res.send(req.body);
        // creating the documents basically in below line 
        const userData = new User(req.body)
        await userData.save()
        res.status(201).render("index");

    } catch (err) {
        res.status(500).send(err)
    }
})



app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})
