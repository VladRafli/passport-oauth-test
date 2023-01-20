const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const credentials = require("../database/Credentials");
const user = require("../database/user");

module.exports = function initPassportGoogleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/login/google/callback",
        scope: ["profile"],
        state: true,
      },
      (accessToken, refreshToken, profile, done) => {
        let userCredentials = credentials.find(
          (val) =>
            val.provider === "https://accounts.google.com" &&
            val.subject === profile.id
        );

        if (userCredentials === undefined) {
          user.push({
            id: user.length,
            accountType: "google",
            name: profile.displayName,
          });

          credentials.push({
            user_id: user.length - 1,
            provider: "https://accounts.google.com",
            subject: profile.id,
          });

          return done(null, { id: user.length - 1, name: profile.displayName });
        }

        return done(null, { id: userCredentials.user_id, name: user.find((val) => val.id === userCredentials.user_id).name })
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    done(null, user.find((val) => val.id === id).id)
  })
}
