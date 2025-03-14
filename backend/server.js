import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userModel from './models/userModel.js';
dotenv.config(); 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Failed to connect to MongoDB', err));
const app=express();
const port =5000;


app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.render("Login.jsx");
})
app.post("/signup",async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const exist= await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User already exists"});
        }
        if(password.length < 8)
        {           
             return res.json({success:false,message:"Password should be min of length : 8"});
        }
        
        const newUser=new userModel({name,email,password});
        const user=await newUser.save();
        res.json({success:true,message:token});
    }
    catch(err)
    {
        console.log(err);
        res.json({success:false,message:err.message})
}

})
app.listen(port, ()=>{
    console.log("server running at ",port);
})