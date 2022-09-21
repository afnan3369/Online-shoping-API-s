const Cart = require("../models/cart"); 
const { verifyTokenAndAdmin, verifyAuthorizatioAndToken, verifyToken } = require("./verifytoken");

const router= require("express").Router();

//creat
router.post("/", verifyToken, async (req, res)=>{
    const newCart= new Cart(req.body);
     try{
       const savedCart= await newCart.save();
       res.status(200).json(savedCart)
     }catch(e){
        
        res.status(500).json(e);
     }
});

//update  cart go back products
  router.put("/:id", verifyAuthorizatioAndToken, async(req, res)=>{                  
     
      try{
          const updatCart= await Cart.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
           res.status(200).json(updatCart);
      }catch(e){
          console.log(e);
          res.status(500).json(e);
      }
  })
// //dell
//  router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
//      try{
//         await Product.findByIdAndDelete(req.params.id)
//         res.status(200).json("Product has been deleted")
//      }catch(e){
//          console.log(e)
//          res.status(500).json(e)
//      }
//  })
// // //get
//  router.get("/find/:id", async(req, res)=>{
//      try{
//         const product= await Product.findById(req.params.id);
        
//         res.status(200).json(product)
        
//      }catch(e){
//          console.log(e)
//          res.status(500).json(e)
//      }
//  })

//  router.get("/", async(req, res)=>{
//      const qNew= req.query.new;
//      const qCategory= req.query.category;

//      try{
//         let products;
//         if(qNew){
//             products= await Product.find().sort({ createdAt: -1}).limit(5);
//         }else if(qCategory){
//             products= await Product.find({catagorie: {$in: [qCategory],}});

//         }else{
//             products= await Product.find();
//         }
        
       
//         res.status(200).json(products)
        
//      }catch(e){
//          console.log(e)
//          res.status(500).json(e)
//      }
//  })




module.exports= router;