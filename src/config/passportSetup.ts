
require('dotenv').config();

const passport = require('passport')
const googleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new googleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL,
    passReqToCallback : true
}, (request:any, accessToken:String, refreshToken:String, profile:any,done:any) =>{
    console.log(profile);
    return done(null,profile);
 }
))
