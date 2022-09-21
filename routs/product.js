const Product = require("../models/product"); 
const { verifyTokenAndAdmin, verifyAuthorizatioAndToken } = require("./verifytoken");

const router= require("express").Router();
console.log("im 1")
//creat
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    console.log("im 1")
     const newProduct= new Product(req.body);
     console.log("im 2")
     try{
        console.log("im 3")
       const savedProduct= await newProduct.save();
       res.status(200).json(savedProduct)
     }catch(e){
        console.log("im 4")
        res.status(500).json(e)
     }
})

//update
 router.put("/:id", verifyAuthorizatioAndToken, async(req, res)=>{                  //?
     
     try{
         const updateProduct= await Product.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
          res.status(200).json(updateProduct);
     }catch(e){
         console.log(e);
         res.status(500).json(e);
     }
 })
//dell
 router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
     try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
     }catch(e){
         console.log(e)
         res.status(500).json(e)
     }
 })
// //get
 router.get("/find/:id", async(req, res)=>{
     try{
        const product= await Product.findById(req.params.id);
        
        res.status(200).json(product)
        
     }catch(e){
         console.log(e)
         res.status(500).json(e)
     }
 })

 router.get("/", async(req, res)=>{
     const qNew= req.query.new;
     const qCategory= req.query.category;

     try{
        let products;
        if(qNew){
            products= await Product.find().sort({ createdAt: -1}).limit(5);
        }else if(qCategory){
            products= await Product.find({catagorie: {$in: [qCategory],}});

        }else{
            products= await Product.find();
        }
        
       
        res.status(200).json(products)
        
     }catch(e){
         console.log(e)
         res.status(500).json(e)
     }
 })




module.exports= router;