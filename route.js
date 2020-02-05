const express = require('express');
const router = express.Router();

router.post('/login',function(req,res)
{
   // console.log('hi node');
    const name   = req.body.name;
    res.json({'err':0,'name':name,'node':1,'who':'url first response'});
})

module.exports = router;