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
    password: String,

    //new:
    pin: Number,

    totalMoney: { type: Number, default: 0 },
    transactions: [{
        money: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }]
});

// Create user model
const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/api/login', async (req, res) => {
    console.log(req.body.password)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (req.body.password == "" && req.body.pin == null) {
        return res.status(401).json({ message: 'Password and pin are empty, enter either one' });
    }

    //condition for either password or pin
    if (user.password !== req.body.password) {
        if (req.body.pin != null) {
            if (req.body.pin == user.pin) {
                return res.json(user);
            }
            else {
                return res.status(401).json({ message: 'Incorrect pin' });
            }
        }
        return res.status(401).json({ message: 'Incorrect password' });
    }

    //const instanceId = user._id;
    res.json(user);
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
        password: req.body.password,
        pin: req.body.pin,
        totalMoney: 0,
        transactions: []
    });

    await user.save();

    res.json({ message: 'Registration successful, proceed to log in' });
});


//To save changed to MongoDB when logging out
app.post('/checkout', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        await user.updateOne({
            $set: {
                transactions: req.body.transactions,
                totalMoney: req.body.totalMoney
            }
        });
        console.log("User updated");
        res.status(200).send("User updated successfully");
    } else {
        console.log("User not found");
        res.status(404).send("User not found");
    }
})


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