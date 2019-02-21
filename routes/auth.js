
const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')
const Service = require('../models/Service')

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

function isLogged2(req, res, next) {
  if (!req.isAuthenticated()) return next()
  return res.redirect('/dashboard')
}

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')

})

router.post('/signup', (req, res, next) => {

  if (req.body.password != req.body.password2) {
    return res.render('auth/signup', { error: 'Please type the same password' })
  }
  
  req.body.location= {
    coordinates:[req.body.lng, req.body.lat],
    address:req.body.address
    }
    if(!req.body.location){
      return res.render('auth/signup', { error: 'Please type the same password' })    
    }
  User.register({ ...req.body }, req.body.password)

    .then(() => {
      passport.authenticate('local')(req, res, () => {
        return res.redirect('/dashboard')
      })
    })
    .catch(error => {
      console.log(error)
      res.render('auth/signup', {error: error })
    })
})

router.get('/login', isLogged2, (req, res, next) => {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/dashboard')
})

router.get('/dashboard', isLogged,(req, res, next) => {
  let {id} = req.user
  User.findById(id)
  .then( user => {
    Service.find({username: user.name}).populate("woosher").populate("user")
      .then(services => {
        user.services = services
        res.render('auth/dashboard', {user, services})
      })
      .catch(error => {
        res.render('auth/dashboard', { error })
      });
  })
  .catch(error => {
    res.render('auth/dashboard', { error })
  });
  // Promise.all([ User.findById(id), Service.find({username: req.user.name}).populate("woosher") ] )
  //     .then(([user, services])=>{
  //       //console.log(result[1])
  //       user.services = services
  //       res.render('auth/dashboard', user)
  //     })
      // .catch(error => {
      //   res.render('auth/dashboard', { error })
      // });

})
router.get('/become-woosher',(req,res,next)=>{
  res.render('auth/becomeW')
})
router.post('/become-woosher',(req,res,next)=>{
  User.findByIdAndUpdate(req.user.id, { ...req.body})
.then(()=>{
    res.redirect('/dashboard')
})
.catch((e)=>console.log(e))

})


router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/')
})

module.exports = router