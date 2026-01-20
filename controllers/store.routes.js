const router = require('express').Router();
const Store = require('../models/store')

/// READ PART 1
router.get('/',async(req,res)=>{
    const allStores = await Store.find();
    res.render('all-stores.ejs',{allStores:allStores})
});


/// CREATE 
router.get('/new',(req,res)=>{
    res.render('create-store.ejs');
})

router.post('/',async(req,res)=>{
   try{
     const createdStore = await Store.create(req.body);
    res.redirect('/Stores')
   }
   catch(error){
    console.log(error)
   }
})

/// READ PART 2
router.get('/:id',async(req,res)=>{
    const foundStore = await Store.findById(req.params.id)
    res.render('store-details.ejs',{foundStore:foundStore})
})













module.exports = router;