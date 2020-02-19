const functions = require('firebase-functions');
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./Routes/users');
const campaign = require('./Routes/campaign');

const app = express();
const dotenv = require('dotenv');
dotenv.config();


//passport config
require('./config/passportLogin')(passport);
require('./config/passportRegister')(passport);


var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

mongoose.connect(process.env.MONGODB_URI,  { 
        useNewUrlParser: true,

    }, function (err) {
    if (err) {
        console.log("Failed to connect to MongoDB");
        console.error(err);
    } else {
        console.log("Successfully connected to MongoDB");
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());


app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/campaign', campaign);

  const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

exports.app = functions.https.onRequest(app);
