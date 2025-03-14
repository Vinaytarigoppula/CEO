import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'

const app=express();
const port =5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log("server running at ",port);
})