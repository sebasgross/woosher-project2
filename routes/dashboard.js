const router = require('express').Router()
const Service = require('../models/Service')
const User = require('../models/User')
const Review = require('../models/Review')

router.get('/dashboard', (req, res, next)=>{
	let {id} = req.user
	User.findById(id)
			.then((user)=>{
				res.render('auth/dashboard', user)
			})
			.catch((e)=>console.log(e))
})

module.exports = router