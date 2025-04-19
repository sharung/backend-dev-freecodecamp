let express = require('express');
const bodyParser = require('body-parser');
let app = express();
require('dotenv').config()

// statistic 
app.use("/public", express.static(__dirname + "/public"))

// bodyparser
app.use(bodyParser.urlencoded({extended:false}))

// Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
    let string = `${req.method} ${req.path} - ${req.ip}`
    console.log(string);
    next();
})
// app.use(express.static(), __dirname + "/public")

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
    
});

app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE==="uppercase"){
        response = "Hello json".toUpperCase()
    } else {
        response = "Hello json";
    }
    res.json({"message": response});
})


app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
},(req,res) => {
    res.json({time: req.time})
})


app.get('/:word/echo', (req,res) => {
    let response = req.params.word;
    res.json({"echo": response});
})

app.get('/name', (req,res) => {
    // let firstName = req.query.first;
    // let lastName = req.query.last;

    var {first, last} = req.query;

    res.json({
        name: `${first} ${last}`
    });
})

app.post('/name', (req,res) => {
    let {first, last} = req.body;
    res.json({name: `${first} ${last}`})
})


















 module.exports = app;
