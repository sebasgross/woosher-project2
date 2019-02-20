
const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')
const Service = require('../models/Service')

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

  req.body.location= {coordinates:[req.body.lng, req.body.lat]}
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

router.get('/dashboard', isLogged, (req, res, next) => {
  let {id} = req.user
  User.findById(id)
      .then((user)=>{
        res.render('auth/dashboard', user)
      })
      .catch(error => {
        res.render('auth/dashboard', { error })
      })
  // Service.find({ user: id }).sort({createdAt:-1}).limit(5)
  //     .then(({services})=>{
  //       res.render('auth/dashboard', {services})
  //     })
  //     .catch(error => {
  //       res.render('auth/dashboard', { error })
  //     })
})

router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/')
})

module.exports = router