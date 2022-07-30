const DiscordStrategy = require('passport-discord').Strategy;

const passport  = require('passport')
const User = require('../models/User.js')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id)
    if(user) done(null,user)
})

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify','guilds']
}, async (accessToken,refreshToken,profile,done)=>{
    try{
        const user = await User.findOne({discordId: profile.id})

        if(user){
            done(null, user)
        }
        else{
            const newUser = await User.create({
                discordId: profile.id,
                userName: profile.username,
                guild: profile.guilds,
                avatar: profile.avatar 
            })
            const savedUser = await newUser.save()
            done(null,savedUser)
        }
    }
    catch(err){
        console.log(err)
        done(err,null)
    }
}))