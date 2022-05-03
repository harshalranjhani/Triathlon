const express = require('express');
const app = express();
const path = require("path");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/quiz/harry-potter',(req,res)=>{
    res.render(`harryPotter`);
});

app.get('/quiz/marvel',(req,res)=>{
    res.send(`<h1>MARVEL</h1>`);
});

app.get('/quiz/hunger-games',(req,res)=>{
    res.send(`<h1>HUNGER GAMES</h1>`);
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});