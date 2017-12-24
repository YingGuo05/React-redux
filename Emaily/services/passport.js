const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys.js')
const mongoose = require('../config/keys')
const User = require('../models/User.js').User
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user=>{
        done(null,user)
    })
})
passport.use(new GoogleStrategy({
    clientID:keys.googleClientId,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile)
    User.findOne({googleId:profile.id})
    .then(user=>{
        if(user){
            done(null,user)
        }else{
            new User({googleId:profile.id}).save()
            .then(res=>{
                done(null,res)
            })
        }
    })
        
}))
