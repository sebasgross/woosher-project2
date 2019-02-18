const router = require("express").Router()




router.get('/status',(req,res,next)=>{
    Service.find()
    .then(services=>{
        res.render('service/status',{services})
    })
    .catch((e)=>next(e))
    
})
// router.post('/status',(req,res,next)=>{

// })
router.get('/new',(req,res,next)=>{
    res.render('service/new')
})

router.post('/new',isLogged, (req,res,next)=>{

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

router.get('/review',(req,res,next)=>{
    res.render('service/review')
})


module.exports = router