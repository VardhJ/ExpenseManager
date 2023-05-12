// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config()

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



//OpenAI
// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);


// (async () => {

//     try {
//         const completion = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: "Hello world",
//         });
//         console.log(completion.data.choices[0].text);
//     } catch (error) {
//         if (error.response) {
//             console.log(error.response.status);
//             console.log(error.response.data);
//         } else {
//             console.log(error.message);
//         }
//     }
// })();






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

    //Sending the user details back to client-side
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


//To save changes to MongoDB when logging out
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
        return
    } else {
        console.log("User not found");
        return res.status(404).send("User not found");
    }
})


//Fetching all user transactions
app.get('/api/userdata/:userEmail', async (req, res) => {
    console.log(req.params.userEmail)
    try {
        const user = await User.findOne({ email: req.params.userEmail }); // Retrieve only the transactions field
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user data' });
    }
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