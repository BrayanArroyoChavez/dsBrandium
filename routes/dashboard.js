const { Router } = require('express');
const router = new Router();

router.get('/dashboard',(req,res) =>{
    res.render('dashboard.ejs')  
 });

 module.exports = router