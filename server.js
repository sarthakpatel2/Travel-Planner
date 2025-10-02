const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Change to 5001 if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection without deprecated options
mongoose.connect('mongodb://localhost:27017/travelPlanner')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    age: Number,
    gender: String
});

const User = mongoose.model('User', UserSchema);

// Route to handle registration
app.post('/register', (req, res) => {
    const userData = new User(req.body);
    userData.save()
        .then(() => res.status(201).send('User registered successfully!'))
        .catch(err => {
            console.error('Registration error:', err);
            res.status(400).send('Error: ' + err.message);
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
