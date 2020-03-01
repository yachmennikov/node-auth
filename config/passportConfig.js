const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/userModel');


passport.serializeUser( (user, done) => {
  done(null, user.id)
})

passport.deserializeUser( (id, done) => {
  User.findById(id).then( user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: '/auth/google/redirect'
},
function(accessToken, refreshToken, profile, done) {

  User.findOne({googleId: profile.id}).then( currentUser => {
    if(currentUser) {
      console.log('currentUser', currentUser)
      done(null, currentUser)
    } else {
      new User({ username: profile.displayName, googleId: profile.id }).save()
      .then( (newUser) => done(null, newUser))
    }
   
  })

 
})
)