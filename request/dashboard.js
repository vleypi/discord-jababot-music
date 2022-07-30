const {Router} = require('express')
const router = Router()
const passport = require('passport')

const isAuthorized = (req,res,next) =>{
    if(req.user){
        console.log("User is logged in")
        next()
    }
    else{
        res.redirect('/')
    }
}



router.get('/', isAuthorized, (req,res)=>{
    return res.status(200).json(req.user)
})


module.exports = router;
