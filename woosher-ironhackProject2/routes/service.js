const router = require("express").Router()
// const Service = require("../models/Service")

router.get('/request',(req,res,next)=>{
    res.render('service/woosherRequest')
})

module.exports = router