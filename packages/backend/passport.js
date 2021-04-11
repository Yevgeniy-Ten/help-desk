const LocalStrategy = require("passport-local").Strategy;
const {User} = require("./models");
const bcrypt = require("bcryptjs");
module.exports = function (passport) {
    console.log("passport is working");
    passport.serializeUser(function (users, done) {
        return done(null, users.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({where: {id}}).then((users) => {
            return done(null, users);
        });
    });

    passport.use(
        "local-signin",
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },

            function (req, email, password, done) {
                const isValidPassword = function (userpass, password) {
                    return bcrypt.compareSync(password, userpass);
                };

                User.findOne({where: {email: email}, include: ["company", "role", "orgStructure"]})
                    .then(function (user) {
                        if (!user) {
                            return done(null, false, {message: "Email does not exist"});
                        }
                        if(!user.isAuthorized) return done(null, false, {message: "Не потвержденный пользователь"});
                        if (!isValidPassword(user.password, password)) {
                            return done(null, false, {message: "Incorrect password."});
                        }

                        const userinfo = user.get();
                        // где-то в доках указано что passport.authenticate автоматом вызывает рек логин
                        req.logIn(user, function (err) {
                            return err ? next(err) : null;
                        });

                        return done(null, userinfo);
                    })
                    .catch(function (err) {
                        console.log("Error:", err);

                        return done(null, false, {
                            message: "Something went wrong with your Signin",
                        });
                    });
            }
        )
    );
};
