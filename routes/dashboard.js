// const router = require('express').Router()
// const Service = require('../models/Service')
// const User = require('../models/User')
// const Review = require('../models/Review')
//
// router.get('/dashboard', (req, res, next)=>{
// 	let {id} = req.user
// 	User.findById(id)
// 			.then(user=>{
// 				console.log(user)
// 				res.render('auth/dashboard', user)
// 			})
// 			.catch(error => {
// 				res.render('auth/dashboard', { error })
// 			})
// })
//
// module.exports = router