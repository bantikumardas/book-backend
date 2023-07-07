const router=require('express').Router();
const File=require('../models/book');

router.get('/:id',async (req, res)=>{
    try{
        console.log('contribution')
        const file=await File.find({userId: req.params.id});
        if(!file){
            return res.render('read', {error:'No contribution'});
        }
        console.log(file)
        return res.send(file);
    }catch(err){
        return res.render('read', {error : 'somethig went wrong'});
    }
});

module.exports=router;