const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override")
const events = require("./data/events");
const { fileLoader } = require("ejs");
const port = 8080;
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));


app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/events/new",(req,res)=>{
    res.render("new");
});

app.get("/events" , (req,res)=>{
    res.render("events", {events});
});


app.post("/events", (req, res) => {

    const { title, description, date, venue, category } = req.body;

    const newEvent = {
        id: events.length + 1,
        title,
        description,
        date,
        venue,
        category
    };

    events.push(newEvent);

    res.redirect("/events");

});


app.get("/events/:id", (req,res) => {
    const {id} = req.params;

    const foundEvent = events.find((event) => event.id == id);
    res.render("show" , {foundEvent});

});

app.delete("/events/:id",(req,res)=>{
    const {id} = req.params;

    const filteredEvents = events.filter((event)=>event.id != id);
    events.length= 0 ;
    filteredEvents.forEach(event => {
        events.push(event);
    });
    res.redirect("/events")
})


app.listen(port,()=>{
    console.log("Server Started")
});