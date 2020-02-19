const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const querystring = require('querystring');


const router = express.Router();




router.post('/login',  (req, res) => {
  passport.authenticate('login', 
    
   { session: false },
    (err, user) => {
      if (err || !user) {
        console.log(err);
        return res.status(400).json({ error: err});
      }
        const obj = {
          isLoggedIn: true,
          data: {
            displayName: user.displayName,
            email: user.email,
            userId: user._id
          }
        }
        
        res.status(200).send( {obj });
      }
  )(req, res);

});


router.post('/register', (req, res, next) => {
  passport.authenticate('register', 
    
   { session: false },
    (error, user) => {
      if (error || !user) {
        return res.status(400).json({ error: error });
      }

      /** This is what ends up in our JWT */
      const obj = {
          isLoggedIn: true,
          data: {
            displayName: user.displayName,
            email: user.email,
            userId: user._id
          }
        }
      res.status(200).json({obj});
      }
      
  )(req, res);
});

module.exports = router;