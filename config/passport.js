const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Strategy = require('passport-local').Strategy;
const User = mongoose.model('users');
const jwt = require('jsonwebtoken');
const keys = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use('local-signup', new Strategy(
  (username, password, done) => {
    User.findOne({'username': username }, async (err, user) => {
      if (err) { return done(err); }
        if (!user) {
          const newUser = new User();
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            if(username === "diego.lievano"){
                newUser.role = "Admin";
            } else {
                newUser.role = "User";
            }
            try{
                const user = await newUser.save();
                const token = await jwt.sign(user.id, keys.jwtSecret);
                return done(null, user);
            } catch (err) {
                return done(null, false);
            }
        }
        if (user) {
            return done(null, false);
        }
      });
  }));

passport.use('local-login', new Strategy(
    (username, password, done) => {
      User.findOne({'username': username }, async (err, user, res, req) => {
          if (err) { return done(err); }
          if (!user) {
              return done(null, false);
          }
          if (!bcrypt.compareSync(password, user.password)) {
              done(null, false);
              return true;
          }
          return done(null, user);
      });
  }));
