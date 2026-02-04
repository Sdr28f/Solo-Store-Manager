const router = require('express').Router();
const Product = require('../models/product');
const Store = require('../models/store')
const isSignedIn = require('../middleware/is-signed-in')

/// READ PART 1
router.get('/',async(req,res)=>{
    const allStores = await Store.find({owner:req.session.user._id});
    res.render('all-stores.ejs',{allStores:allStores})
});


/// CREATE 
router.get('/new', isSignedIn,(req,res)=>{
    res.render('create-store.ejs');
})

router.post('/', isSignedIn,async(req,res)=>{
    if(req.body.isActive === 'on'){
        req.body.isActive = true
    }else{
        req.body.isActive = false
    }

    req.body.owner = req.session.user._id;
    
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
    const allProducts = await Product.find({Store:req.params.id })
    res.render('store-details.ejs',{foundStore:foundStore,allProducts})
})

/// DELETE
router.post('/delete/:id',async(req,res)=>{
    const deleteStore = await Store.findByIdAndDelete(req.params.id)
    res.redirect('/stores');
});

/// UPDATE

router.get('/:id/edit',async(req,res)=>{
    const editStore = await Store.findById(req.params.id);
    res.render('edit-store.ejs',{editStore:editStore});
})

router.post('/update/:id',async(req,res)=>{
    if(req.body.isActive === 'on'){
        req.body.isActive = true;
    }else{
        req.body.isActive = false;
    }
    await Store.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/stores/' + req.params.id );
})












module.exports = router;