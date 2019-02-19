const router = require("express").Router()
const User = require('../models/User')
const Service = require('../models/Service')

//middlewear
function isLogged(req, res, next) {
    if (req.isAuthenticated()) return next()
    return res.redirect('/login')
  }

// function makeRoute(req,res,next){
//     if(!req.body.addressWoosher){
//         req.body.addressWoosher = req.user.location.coordinates
//     }
// }

  router.get('/detail/:id',(req,res,next)=>{
      const {id} = req.params
    //   req.body.woosher = req.user._id
    //   req.body.addressTo={
    //       coordinates:[req.body.coordinates[0],req.body.coordinates[1]]
    //   }
      
      Service.findById(id)

      .populate('user')
      .then(service=>{
        
        res.render('service/detail',{service, user: req.user})
      })
      .catch((e)=>next(e))
  })

function isLogged(req, res, next) {
    if (req.isAuthenticated()) return next()
    return res.redirect('/login')
}

router.get('/status', isLogged, (req,res,next)=>{
    Service.find()
    .then(services=>{
//        services.populate()
        res.render('service/status', {services})
            })
            
            .catch((e)=>next(e))    
    })
    


router.get('/new', isLogged, (req,res,next)=>{
    res.render('service/new')
})

router.post('/new', isLogged , (req,res,next)=>{
    req.body.addressFrom= {
        coordinates:[req.body.lng, req.body.lat]
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

router.get('/review', isLogged, (req,res,next)=>{
    res.render('service/review')
})

module.exports = router