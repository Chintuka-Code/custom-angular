const express = require('express');
const router = express.Router();

router.get('/data',function(req,res)
{
   // console.log('hi node');
    const name   = req.body.name;
   res.json({'err':0,'who':'url2 response','node':2})
 //res.sendStatus(404)
})

router.delete('/del',(req,res)=>
{
    res.send('ok');
})

module.exports = router;