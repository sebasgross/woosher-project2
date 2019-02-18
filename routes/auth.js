
const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')

function isLogged(req, res, next) {
  if (req.isAuthenticated()) return next()
  return res.redirect('/login')
}

router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {

  User.register({ 
    name: req.body.name,
    lastName: req.body.lastName,
    location: {
      address: req.body.address 
    },
    email:req.body.email
  
  
  
  }, req.body.password)

  
    .then(() => {

      passport.authenticate('local')(req, res, () => {
        return res.redirect('/')
      })
    })
    .catch(error => {
      console.log(error)
      res.render('auth/signup', { error })
    })
})

router.get('/login', (req, res, next) => {
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/')
})

router.get('/profile', isLogged, (req, res, next) => {
  res.render('auth/profile')
})

router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/')
})

module.exports = router