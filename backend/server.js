import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userModel from './models/userModel.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Failed to connect to MongoDB', err));

const app = express();
const port = 5000;
app.use(express.static(join(__dirname, '../frontend/dist')));
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the dist folder
app.use(express.static(join(__dirname, '../frontend/dist')));
app.get("/login",(req,res)=>{
    res.status(200);
})
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username);
        const user = await userModel.findOne({ username });
        
        return res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
});

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (password.length < 8) {           
            return res.json({ success: false, message: "Password should be at least 8 characters long" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save();
        res.redirect("/login");
        return res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
});


// Catch-all route to handle React routing
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});