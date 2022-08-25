import { User } from "./../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport-local";
const localStrategy = passport.Strategy;

export default function (passport) {
  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({ where: {email: email} }, (err, user) => {
        if (err) throw err;
        if (!user) {
          console.log('false1')
          return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            console.log('true')
            return done(null, user);
          } else {
            console.log('false')
            return done(null, false);
          }
        });
      });
    })
  );
 
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
      User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          username: user.username,
        };
        cb(err, userInformation);
      });
    });
  };