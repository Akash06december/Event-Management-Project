const express = require("express");
const app = express();
const path = require("path")

const port = 8080;
app.set("view engine" , "views");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.listen(port,()=>{
    console.log("Server Started")
})