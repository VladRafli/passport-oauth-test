import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";

export default function strategy(app) {
  /**
   * @type {import("passport-google-oauth").IOAuth2StrategyOption}
   */
  const options = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:5000/auth/google/callback`,
  };

  /**
   * @type {(accessToken: string, refreshToken: string, profile: import("passport").Profile, done: import("passport-google-oauth").VerifyFunction) => void}
   */
  const callback = async (accessToken, refreshToken, profile, done) => {
    
  };

  passport.use(new OAuth2Strategy(options));
}
