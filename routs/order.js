const Order = require("../models/oreder"); 
const { verifyTokenAndAdmin, verifyAuthorizatioAndToken, verifyToken } = require("./verifytoken");

const router= require("express").Router();

//creat
router.post("/", verifyToken, async (req, res)=>{
    const newOrder= new Order(req.body);
     try{
       const savedOrder= await newOrder.save();
       res.status(200).json(savedOrder)
     }catch(e){
        
        res.status(500).json(e);
     }
});

//update  cart go back products
  router.put("/:id", verifyTokenAndAdmin, async(req, res)=>{                  
     
      try{
          const updatOrder= await Order.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
           res.status(200).json(updatOrder);
      }catch(e){
          console.log(e);
          res.status(500).json(e);
      }
  })
 //dell
  router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
      try{
         await Order.findByIdAndDelete(req.params.id)
         res.status(200).json("Order has been deleted")
      }catch(e){
          console.log(e)
          res.status(500).json(e)
      }
  })
  //get user cart 
  router.get("/find/:userId",verifyAuthorizatioAndToken, async(req, res)=>{
      try{
         const orders= await Order.find({userid: req.params.userId});
        
         res.status(200).json(orders)
        
      }catch(e){
          console.log(e)
          res.status(500).json(e)
      }
  })

//get all
router.get("/", verifyTokenAndAdmin, async(req, resp)=>{
    try{
        const orders= await Order.find()
        resp.status(200).json(orders)
    }catch(e){
        resp.status(500).json(e)
    }
})

//get monthly incom

router.get("/incom", verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date();
    const lastMonth= new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try{
        const incom = await Order.aggregate([
            {$match: { createdAt: { $gte: previousMonth}}},
            {
                $project: {
                month:{$month: "$createdAt"},
                sales: "$amount",
                }},
                {
                    $group:{
                        _id: "$month",
                        total: {$sum: "$sales"},
                    },
                },  
             
        ]);
        res.status(200).json(incom);
    }catch(e){
        res.status(500).json(e)
    }

});


module.exports= router;