const router = require("express").Router()

function isLogged(req, res, next) {
    if (req.isAuthenticated()) return next()
    return res.redirect('/login')
}

router.get('/status', isLogged, (req,res,next)=>{
    Service.find()
    .then(services=>{
        res.render('service/status',{services})
    })
    .catch((e)=>next(e))
    
})

router.get('/new', isLogged, (req,res,next)=>{
    res.render('service/new')
})

router.post('/new', isLogged , (req,res,next)=>{
    req.body.addressFrom= {
        coordinates:[req.body.lat, req.body.lng]
        }
    Service.create(req.body)
    .then(s=>{
        console.log(s)
        res.send("what")
    })
    .catch(err=>next(err))
})

router.get('/review', isLogged, (req,res,next)=>{
    res.render('service/review')
})

module.exports = router