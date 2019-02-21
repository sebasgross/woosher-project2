const router = require("express").Router()
const User = require('../models/User')
const Service = require('../models/Service')

//middlewear
const isWoosher = (req, res, next) => {
    if (!req.user) return res.redirect('/')
    if (req.user.role === 'WOOSHER') return next()
    return res.redirect('/')
  }
  const isUsuario = (req, res, next) => {
    if (!req.user) return res.redirect('/')
    if (req.user.role === 'USUARIO') return next()
    return res.redirect('/')
  }
function isLogged(req, res, next) {
    if (req.isAuthenticated()) return next()
    return res.redirect('/login')
  }

router.get('/list',isLogged,isWoosher,(req,res,next)=>{
    Service.find({woosher: req.user._id})
    .populate('user')
    .populate('woosher')
    .then((services)=>{
        res.render("service/list",{services})
    })
})
// router.post('/list',(req,res,next)=>{
//     User.findByIdAndUpdate(req.params.id, { ...req.body})
//   .then(()=>{
//       res.redirect('/dashboard')
//   })
//   .catch((e)=>console.log(e))
  
//   })

router.post('/detail/:id',isLogged,isWoosher,(req,res,next)=>{
    Service.findByIdAndUpdate(req.params.id, { ...req.body, "addressTo.coordinates": req.user.location.coordinates,"woosher":req.user}, { new: true })
    .then(()=>{
        res.redirect('/dashboard')
    })
    .catch((e)=>console.log(e))

})  

  router.get('/detail/:id',isLogged, isWoosher,(req,res,next)=>{
      const {id} = req.params

      Service.findById(id)
      .populate('user')
      .then(service=>{
        res.render('service/detail',{service, user: req.user})
      })
      .catch((e)=>next(e))
  })

router.get('/status',isLogged,isWoosher,(req,res,next)=>{

    Service.find()
    .then(services=>{
//        services.populate()
        res.render('service/status', {services})
            })
            
            .catch((e)=>next(e))    
    })
    


router.get('/new', isLogged,isUsuario, (req,res,next)=>{
    res.render('service/new')
})

router.post('/new', isLogged , isUsuario, (req,res,next)=>{
    req.body.addressFrom= {
        coordinates:[req.body.lng, req.body.lat]
        }
    req.body.user = req.user._id
    req.body.username = req.user.name

    Service.create(req.body)
    .then(()=>{
        res.redirect('/dashboard')
    })
    .catch(err=>next(err))
})

router.get('/review', isLogged, (req,res,next)=>{
    res.render('service/review')
})

module.exports = router