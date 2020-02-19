const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Load user model
const User = require('../models/User');

module.exports = function(passport){
	passport.use('login',
		new LocalStrategy({ usernameField: 'email'}, async(email, password, done) => {
			//Match User
			console.log("inside login");
			console.log(password);
			let user;
			try{
			 user = await User.findOne({email: email});
			}
			catch(err){
				console.log(err);
		          return done("something went wrong");
		      }
				if(!user){
					return done('the email is not registered');
				}
				console.log(user);
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if(isMatch){
						console.log("matched");
						return done(null, user);
					}else{
						return done('password incorrect');
					}
				});
			})
		);
}