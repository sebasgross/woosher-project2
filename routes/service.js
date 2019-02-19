const router = require("express").Router()
const User = require('../models/User')
const Service = require('../models/Service')

//middlewear
function isLogged(req, res, next) {
    if (req.isAuthenticated()) return next()
    return res.redirect('/login')
  }

router.get('/status',(req,res,next)=>{
    Service.find()
    .then(services=>{
//        services.populate()
        res.render('service/status', {services})
            })
            
            .catch((e)=>next(e))    
    })
    


router.get('/new',(req,res,next)=>{
    res.render('service/new')
})

router.post('/new',isLogged ,(req,res,next)=>{

    req.body.addressFrom= {
        coordinates:[req.body.lat, req.body.lng]
        }
    req.body.user = req.user._id
    req.body.username = req.user.name

    Service.create(req.body)
    .then(s=>{
        console.log(s)
        res.send("what")
    })
    .catch(err=>next(err))
})

router.get('/review',(req,res,next)=>{
    res.render('service/review')
})


module.exports = router