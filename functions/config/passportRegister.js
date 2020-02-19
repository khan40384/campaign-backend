const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//Load user model
const User = require('../models/User');

module.exports = function(passport){
	passport.use('register',
		new LocalStrategy({ usernameField: 'email', passReqToCallback: true}, async (req, email, password, done) => {
			console.log("inside register");

			const displayName = req.body.displayName;
		    let user1;
		      try{
		      user1 = await User.findOne({email: email});
		        }
		        catch(err){
		          console.log(err);
		          return done("something went wrong");
		        }
		      if(user1){
		        console.log(user1);
		        console.log("user already exists");
		        return done("user already exists");
		      }


		   user = new User({
		        displayName: displayName,
		        email: email,
		        password: password
		      });

		      const salt = await bcrypt.genSalt(10);
		      user.password = await bcrypt.hash(user.password, salt);
		      try{
		      await user.save();
		  	  }
		  	  catch(err) {
		  	  	console.log(err);
		  	  	return done("cannot register");
		  	  };
		  	  console.log(user);
		      return done(null, user);
					
		}
		));
}