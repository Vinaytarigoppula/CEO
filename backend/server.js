import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userModel from './models/userModel.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import jwt from 'jsonwebtoken';
import authenticateUser from './middleware/authMiddleware.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.static(join(__dirname, '../frontend/dist')));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Serve static files
app.use(express.static(join(__dirname, '../frontend/dist')));

app.get('/login', (req, res) => {
    res.status(200).send("Login Page");
});

// 🔹 Protect the /dashboard route with the authMiddleware
app.get('/dashboard', authenticateUser, (req, res) => {
    res.json({ success: true, message: "Welcome to dashboard" });
});

// 🔹 Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password, rememberme } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: rememberme ? '30d' : '1d' } // Longer expiry if "Remember Me" is checked
        );

        res.json({ success: true, token, message: "Login successful" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 🔹 Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password should be at least 8 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save();

        return res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 🔹 Code Execution Route
app.post('/execute', async (req, res) => {
    try {
        const { code, language } = req.body;
        if (!code || !language) {
            return res.status(400).json({ success: false, message: "Code and language are required" });
        }

        if (language === 'java') {
            const command = `echo "${code}" | javac -d /dev/shm/Main.java && java -cp /dev/shm Main`;
            exec(command, (error, stdout, stderr) => {
                if (error || stderr) {
                    return res.json({ success: false, output: stderr || error.message });
                }
                res.json({ success: true, output: stdout });
            });
        } else {
            res.status(400).json({ success: false, message: "Unsupported language" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 🔹 Catch-all route for React Routing
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
