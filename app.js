// app.js
// load the things we need
const express = require("express");
const ejs = require("ejs");
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// load the blog poost data
const blogPosts = [{
  title: "Day 1",
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},{
  title: "Day 2",
  text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
},{
  title: "Day 3",
  text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
}];

// index page
app.get("/", function(req, res) {
  res.render('index', {
      blogPosts: blogPosts
  });
});

// blog page
app.get("/posts/:title", function(req, res) {
  blogPosts.forEach(blogPost => {
    if (blogPost.title === req.params.title) {
      res.render('post', {
        blogPost: blogPost
      });
    }
  });
});

app.post("/", function(req, res) {
  blogPosts.push({
    title: req.body.title,
    text: req.body.post
  });
  res.redirect("/");
});

// compose blog page
app.get("/compose", function(reeq, res) {
  res.render('compose');
});

// About Us page
app.get("/about", function(req, res) {
  res.render('about');
});

// Contact Us page
app.get("/contact", function(req, res) {
  res.render('contact');
});

app.listen(3000, function() {
  "Server is running on port 3000"
});
