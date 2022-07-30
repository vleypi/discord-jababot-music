const express = require('express');
const app = express();
require('dotenv').config()

const session = require('express-session')
const passport = require('passport')
const discordStrategy = require('./strategies/discordstrategy')
const db = require('./database/database.js');
const bot = require('./discord-bot/bot');
const PORT = process.env.PORT || 5000

db.then(()=> console.log('Connected to MongoDb')).catch(err=>console.log(err))

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.oauth2'
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth',require('./request/auth'))
app.use('/api/dashboard', require('./request/dashboard'))


const start = () =>{
    try{
        app.listen(PORT, () => {
            console.log(`App listening at ${PORT}`);
        })
        bot()
    }
    catch(err){
        console.log(err)
    }
}

start()
