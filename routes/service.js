const router = require("express").Router()


router.get('/new',(req,res,next)=>{
    res.render('service/form')
})

router.post('/new',(res,req,next)=>{
    const {_id} = req.user
    Service.create({...req.body},{user: _id})
    .then(()=>{
        res.render("service/form")
    })
    .catch(err=>next(err))
})

router.get('/review',(req,res,next)=>{
    res.render('service/review')
})


module.exports = router