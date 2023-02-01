const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { join } = require("lodash");
const mongoose = require('mongoose');


const homeStartingContent = "welcome, here you can write all your blogs";
const aboutContent = "i created this blog for everone.";
const contactContent = "";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


/************************dataBase***************************** */
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });
const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

/************************GET method***************************** */
//get method for home route
app.get('/', (req, res) => {
    Post.find({}, (err,posts)=>{
        res.render("home",
        {
            homeContent: homeStartingContent,
            posts: posts
        });
    })

    // console.log(posts);
});
//get method for about
app.get('/about', (req, res) => {
    res.render('about',
    { aboutContent: aboutContent });
});
//get method for contact
app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: contactContent });
});
//get method for compose
app.get("/compose", (req, res) => {
    res.render("compose");
});

// get method for post 
app.get("/posts/:postId", (req, res) => {
    const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId}, (err, post)=>{
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
});
/************************POST method***************************** */
app.post('/compose', (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    // console.log(req.body.postCompose);
    // console.log(req.body.postComposeBody);
    // posts.push(post);
    post.save((err)=>{
        if(!err){
            res.redirect("/");     
        }
    });
});

//server port at 3000
app.listen(3000, () => {
    console.log("server is running at port 3000");
});