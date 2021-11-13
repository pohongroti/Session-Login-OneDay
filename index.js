const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
const PORT = 4900;

app.listen(PORT,()=>{
    console.log('Sistem Sudah berjalan pada server Localhost di port 4900');
});

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

// a variable to save a session
var session;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

//username and password
const myusername = 'user'
const mypassword = 'user123'



app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});


app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})


app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

