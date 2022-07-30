const {Router} = require('express')
const router = Router()
const passport = require('passport')


router.get('/', passport.authenticate('discord'),(req,res)=>{
    req.redirect('https://jaba-bot-client.herokuapp.com/')
})

router.get('/redirect',passport.authenticate('discord',{
    failureRedirect: 'https://jaba-bot-client.herokuapp.com/',
    successRedirect: 'https://jaba-bot-client.herokuapp.com/'
}),(req,res)=>{
    req.redirect('https://jaba-bot-client.herokuapp.com/')
})

router.get('/logout',(req,res)=>{
    if(req.user){
        req.logout()
        res.redirect('/')
    }
    else{
        res.redirect('/')
    }
})

module.exports = router;
