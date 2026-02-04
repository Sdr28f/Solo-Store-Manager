const router = require('express').Router();
const Product = require('../models/product')
const Store = require('../models/store')





//read

router.get('/',async(req,res)=>{
    const allProducts =   await Product.find({owner: req.session.user._id}).populate('Store');
    console.log('all products');
    res.render('all-products.ejs',{allProducts:allProducts});
});


/// CREATE

router.get('/new',async(req,res)=>{
    const allStores = await Store.find({owner:req.session.user._id});
    res.render('create-product.ejs',{allStores:allStores});
});

router.post('/',async(req,res)=>{
   try{
        const createdProduct = await Product.create(req.body);
    res.redirect('/products/new')
    }
    catch(err){
        console.log('error');
    }
});

///READ 
router.get('/:id',async(req,res)=>{
    const foundProduct = await Product.findById(req.params.id).populate('Store');
    res.render('Product-details.ejs',{foundProduct:foundProduct});
})

//delete
router.post('/delete/:id',async(req,res)=>{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products')
})

//update
router.get('/:id/edit',async(req,res)=>{
    const editProduct = await Product.findById(req.params.id);
    res.render('edit-product.ejs',{editProduct:editProduct});
})
router.post('/update/:id',async(req,res)=>{
    await Product.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/products/' + req.params.id);

})






module.exports = router;