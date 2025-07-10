const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app= express();
dotenv.config();

const port = process.env.PORT || 3000;


const username= process.env.MONGODB_USERNAME;
const password= process.env.MONGODB_PASSWORD;
// mongodb+srv://gufranalm226:Alam2512@cluster0.n4cwrsn.mongodb.net/bitStream?retryWrites=true&w=majority&
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.n4cwrsn.mongodb.net/loginPage?retryWrites=true&w=majority&` , {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
});
const RegistrationSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
});

const Registration = mongoose.model("Registration", RegistrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());





app.get("/", (req, res)=>{
    console.log(__dirname)
    res.sendFile(__dirname + "/index.html");
})


app.post("/register",async  (req, res)=>{
    try{
        const {name, email, password}= req.body;

        const exixtingUser = await Registration.findOne({email : email});
        if(!exixtingUser){

            const RegistrationData = new Registration({
            name,
            email,
            password
            });
    
        await RegistrationData.save();
        res.redirect("/success");
        }
        else{
            console.log("User already exixt");
            res.redirect("/error");

        }
        
    }
    catch(error){
        console.log(error);
        res.redirect("/error");
    }
} )

app.get("/success", (req, res)=>{
    res.sendFile(__dirname+"/success.html");
})
app.get("/error", (req, res)=>{
    res.sendFile(__dirname+"/error.html");
})

app.listen(port, ()=>{
    console.log(`server is running on port no. ${port}`);
})