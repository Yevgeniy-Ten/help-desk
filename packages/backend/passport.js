const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { User } = require("./models");

module.exports = function (passport) {
  console.log("passport is working");
  passport.serializeUser((users, done) => done(null, users.id));

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } }).then((users) => done(null, users));
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

      (req, email, password, done) => {
        const isValidPassword = function (userpass, password) {
          return bcrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: { email },
          include: ["company", "role", "orgStructure"],
        })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Email does not exist" });
            }
            if (user.isFake)
              return done(null, false, {
                message: "Вы не подтвердили свою почту!",
              });
            if (!user.isAuthorized)
              return done(null, false, {
                message: "Не потвержденный пользователь",
              });
            if (!isValidPassword(user.password, password)) {
              return done(null, false, { message: "Incorrect password." });
            }

            const userinfo = user.get();
            // где-то в доках указано что passport.authenticate автоматом вызывает рек логин
            req.logIn(user, (err) => (err ? next(err) : null));

            return done(null, userinfo);
          })
          .catch((err) => {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin",
            });
          });
      }
    )
  );
};
