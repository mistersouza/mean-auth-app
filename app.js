const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
const app = express();
const users = require('./routes/users');

// connect to database
mongoose.connect(config.database.path);

// on connection
mongoose.connection.on('connected', () => {
    console.log(`Successfully connected to ${config.database.db}`);
});

// on error
mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
})


// port
const PORT = 3000;

// CORS middleware
app.use(cors());


// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize()); 
app.use(passport.session()); 
require('./config/passport')(passport);


app.use('/users', users); 

// index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});



app.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`);
})