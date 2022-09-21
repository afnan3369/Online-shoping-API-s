const mongoose= require("mongoose");

const cartsachema = new mongoose.Schema({
    userid: {type:String, required: true},
    products:[
        {productid:{
            type:String,
        },
        quantity:{
            type:Number,
            default:1
        }
    }
    ]
},
{timestamps: true}
)

module.exports= mongoose.model("Cart", cartsachema)