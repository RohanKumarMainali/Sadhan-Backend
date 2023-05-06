const jwt = require("jsonwebtoken");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const userModel = require("../models/user.model");
const dayjs = require("dayjs");
const passportRoute = require("express").Router();
import { Response } from "express";

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

type name = {
  givenName: string;
  familyName: string;
};

type email = {
  value: string;
};

interface profile {
  emails: Array<email>;
  name: name;
  id: string;
  role: string;
}
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/google/callback",
      passReqToCallback: true,
    },
    async (
      request: any,
      accessToken: String,
      refreshToken: String,
      profile: any,
      done: any
    ) => {
      const email = profile?.emails[0]?.value;
      const firstName = profile?.name?.givenName;
      const lastName = profile?.name?.familyName;
      let role = "user";

      // check if user exist or not
      const result = await userModel.find({ email: email });
      let id = "";
      let status = "unverified";
      let image = null;

      // user is new so let's save and add sign-in-method to google
      if (result.length === 0) {
        try {
          const response = await new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            method: "google",
            email_verified: "verified",
            role: "user",
            image: null,
            createdOn: new Date().toDateString(),
          });

          await response.save();
          id = response._id;
        } catch (error) {
          console.log(error);
        }
      } else {
        id = result[0]._id;

        console.log(result[0].role);
        role = result[0].role;
        status = result[0].status;
        image = result[0].image ? result[0].image : null;
      }

      const user = {
        id: id,
        email,
        status: status,
        firstName,
        lastName,
        role,
        image,
        method: "google",
      };
      return done(null, user);
    }
  )
);
