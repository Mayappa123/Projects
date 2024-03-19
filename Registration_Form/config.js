// passport-config.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User"); // Assuming your User model is in this file

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
