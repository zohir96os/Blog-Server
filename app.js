const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 2104;

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Home page
app.get("/", (req, res) => {
  res.render("index");
});
//Create blog
app.get("/create", (req, res) => {
  res.render("create");
});
//About page
app.get("/about", (req, res) => {
  res.render("about");
});
//Conatct page get
app.get("/contact", (req, res) => {
  res.render("contact");
});
//Conatct page post
app.post("/create", (req, res) => {
  // Access form data from req.body
  const title = req.body.title;
  const author = req.body.author;
  const content = req.body.content;

  // Log form data to the terminal
  console.log("New Blog Post:");
  console.log("Title:", title);
  console.log("Author:", author);
  console.log("Content:", content);

  //Save data in txt file
  const postData = `Title: ${title}\nAuthor: ${author}\nContent: ${content}\n`;

  fs.appendFile("blog_post.txt", postData, (err) => {
    if (err) {
      console.log("Error writing blog", err);
      res.status(500).send("Error writing to file");
    } else {
      console.log("Blog post saved to file successfully");
      res.send("Blog post created and saved successfully!");
    }
  });
});
//404 page
app.get("/*", (req, res) => {
  res.status(400).send("You are lost");
});
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
