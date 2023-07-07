const router=require('express').Router();
const File=require('../models/book');


router.get('/:uuid', async (req, res)=>{
    try{
        console.log('look')
        const file=await File.findOne({uuid: req.params.uuid});
        // if(!file){
        //     return res.render('read', {error:'file is not found'});
        // }
        const filepath=file.path;
        const fileName="/"+filepath.slice(8,filepath.length)
        console.log(fileName)
        return res.render("read",{
            path: fileName
        });
    }catch(err){
        return res.render('read', {error : 'somethig went wrong'});
    }
});

module.exports=router;