// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB
//password:hRjw7hpA103kEObl
mongoose
    .connect('mongodb+srv://vardhamanjain2401:hRjw7hpA103kEObl@cluster0.puzklvx.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define user schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Create user model
const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== req.body.password) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const instanceId = user._id;
    res.json({ id: instanceId, message: 'Login successful' });
});



// Register endpoint
app.post('/api/register', async (req, res) => {
    //Checking if email exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    user = new User({
        email: req.body.email,
        password: req.body.password
    });

    await user.save();

    res.json({ message: 'Registration successful, proceed to log in' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});