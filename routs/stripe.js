const router = require("express").Router();
const stripe= require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, resp)=>{
     stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes)=>{
            if(stripeErr){
                resp.status(500).json(stripeErr)
            }else{
                resp.status(200).json(stripeRes)
            }
        }
     )
})




module.exports = router;