const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/quiz/harry-potter", (req, res) => {
  res.render(`harryPotter`);
});

app.get("/quiz/marvel", (req, res) => {
  res.render('marvel');
});

app.get("/quiz/hunger-games", (req, res) => {
  res.render('hg');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
