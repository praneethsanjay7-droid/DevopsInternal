const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const User = require("./Models/SignIn.js");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const PORT=8070;
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/DevopsInternal");
}
main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));


app.get("/",async(req,res)=>{
    res.render("login.ejs");
})

app.post("/login",async(req,res)=>{
    let{username,password}=req.body;
    const user= await User.find({Username:username});
    if(!user){
        res.status(404).send("Invalid credentials");
    }
    if(user.Password===password){
        res.render("Eventpage.ejs",{username});
    }
})

app.get("/signin",async(req,res)=>{
    res.render("Signin.ejs");
})

app.post("/signin",async(req,res)=>{
    let{username,password}=req.body;
    const newUser=new User({
        Username:username,
        Password:password
    });
    await newUser.save();
})

app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
})