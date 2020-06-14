const bcrypt = require("bcryptjs");
const User = require("../models/users.model");
const passport = require("passport");

// define local strategy for auth
const LocalStrategy = require("passport-local").Strategy;

/*

	This is what allows us to know whos communicated with the server without having 
	to send the authentication data like username and password at each request for a new page. 

*/
/* 
	serializeUser determines which data of the user object should be stored 
	in the session. The result of the serializeUser method is attached to the 
	session as req.session.passport.user = {}. 
*/
passport.serializeUser((user, done) => {
	done(null, user.id);
});
/* 

	The first argument of deserializeUser corresponds to the key of the 
	user object that was given to the done.  So your whole object is retrieved 
	with help of that key. That key here is the user id (key can be any key of 
	the user object i.e. name,email etc). In deserializeUser that key is matched 
	with the in memory array / database or any data resource.

*/
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {

		// Match User
		User.findOne({ email: email })
		.then((user) => {
			// Create new User in not found
			if (!user) {
				const newUser = new User({ email, password, name });

				// Hash password before saving in database
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						// set hash password to user
						newUser.password = hash;
						newUser
						.save()
						.then((user) => {
							return done(null, user);
						})
						.catch((err) => {
							return done(null, false, { message: err });
						});
					});
				});
			// Return other user
			} else {

				// if the user is found
				// Match password
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;

					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: "Wrong password" });
					}
				});
			}
		})
		.catch((err) => {
		return done(null, false, { message: err });
		});
	})
);

module.exports = passport;
