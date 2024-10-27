const Order = require("../../models/orders");
const Product = require("../../models/Product");
const ProductReview = require("../../models/review-product");



const addProductReview = async(req,res)=>{
    try {
        const  {userId,
            productId,
            userName,
            reviewMessage,
            reviewValue,} =req.body
            
        if(!userId ||!productId ||!userName ||!reviewMessage ||!reviewValue){
            return res.status(400).json({success:false,message:"In sufficient data add"})
        }
        const order = await Order.find({userId,"cartItems.productId" : productId,orderStatus:"confirmed"})
        if(order.length === 0){
            return res.status(404).json({success:false,message:"Must be purchase for review the order"})
        }
       
        const existingProductReview = await ProductReview.find({userId,productId})
    
        if(existingProductReview.length>0){
            return res.status(400).json({success:false,message:"You already reviewd this product"})
        }
        const newReview = new ProductReview({
            userId,
            productId,
            userName,
            reviewMessage,
            reviewValue,
        })
        await newReview.save()
        const reviews = await ProductReview.find({productId})
        const totalReview = reviews.length;
        const averageReview = reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/totalReview
        await Product.findByIdAndUpdate(productId,{averageReview} )
        res.status(200).json({success:true,data:newReview })

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error occured"})
    }
}
const getProductReviews = async(req,res)=>{
    try {
        const {productId} = req.params
        if(!productId){
            return res.status(400).json({success:false,message:"In sufficient data get"})
        }
        const reviews = await ProductReview.find({productId})
        res.status(200).json({success:true,data:reviews}) 
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error occured"})
    }
}
module.exports ={addProductReview,getProductReviews}