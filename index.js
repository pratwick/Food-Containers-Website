const express = require('express'); // we need require for getting object of library express
const mongoose = require('mongoose');
const path = require('path');   //required for path .join
const dotenv = require('dotenv');// to access environment 
const app = express();
dotenv.config();


const port = process.env.port || 5000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({
    extended: true
}));


mongoose.connect(process.env.mongoURL);
const db = mongoose.connection

db.on('connected', () => {
    console.log("db connected");
})

db.on('disconnected', () => {
    console.log("db disconnected");
})


//database start of contact us -->

const contactSchema = mongoose.Schema({
    name: {
        type: String,   // string is the variable to the mongoose
        require: true   // if it is false then that is not required
    },
    email: {
        type: String,
        require: true
    },
    phoneno: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})


let contactModel = db.model('users', contactSchema); // users is database and the other field is the schema

app.post('/contact', async (req, res) => {   //async await 
    console.log(req.body);
    const data = await contactModel.create({
        name: req.body.name,   // req.body global object
        email: req.body.email,
        phoneno: req.body.phoneno,
        message: req.body.message,
    })
    return res.render("contact");
})

// database end of contactus -->



// database start of checkout -->
const checkoutSchema = mongoose.Schema({
    firstname: {
        type: String,   // string is the variable to the mongoose
        require: true   // if it is false then that is not required
    },
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address1: {
        type: String,
        require: true
    },

    address2: {
        type: String,
        require: true
    },

    cardname: {
        type: String,
        require: true
    },

    cardnumber: {
        type: String,
        require: true
    },

    cvv: {
        type: String,
        require: true
    }
})

let checkoutModel = db.model('containers', checkoutSchema); //  is database and the other field is the schema

app.post('/checkout', async (req, res) => {   //async await 

    const data = await checkoutModel.create({

        firstname: req.body.firstname,   // req.body global object
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        cardname: req.body.cardname,
        cardnumber: req.body.cardnumber,
        cvv: req.body.cvv,
    })
    return res.render("checkout");
})


//database start of contact us --> 
//database start of contact us -->

const signinSchema = mongoose.Schema({
    email: {
        type: String,   // string is the variable to the mongoose
        require: true   // if it is false then that is not required
    },

    password: {
        type: String,
        require: true
    }
})

let signinModel = db.model('signins', signinSchema); // users is database and the other field is the schema
app.post('/sign_in', async (req, res) => {   //async await 
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.password);
    const data = await signinModel.create({
        email: req.body.email,
        password: req.body.password
    })
    return res.redirect("checkout");
})


app.use(express.static('public'));
//get request for normal calculator -->

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/idli", function (req, res) {
    res.sendFile(__dirname + "/idli.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/appe", function (req, res) {
    res.sendFile(__dirname + "/appe.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});
app.get("/sandwich", function (req, res) {
    res.sendFile(__dirname + "/sandwich.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/clear_wall_jars", function (req, res) {
    res.sendFile(__dirname + "/clear_wall_jars.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/dhokla", function (req, res) {
    res.sendFile(__dirname + "/dhokla.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/signin", function (req, res) {
    return res.render("sign_in");
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/checkout", function (req, res) {
    return res.render("checkout"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/contactus", function (req, res) {
    res.render("contact");
});

app.get("/aboutus", function (req, res) {
    res.sendFile(__dirname + "/aboutus.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

app.get("/signin", function (req, res) {
    res.sendFile(__dirname + "/signin.html"); // sendFile for sending the file
    // console.log(__dirname);  here the __dirname give the path
});

//mongoose over ---->


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("My express js server is running from port number", port);
});