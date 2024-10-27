const Cart = require("../../models/Cart");
const Product = require("../../models/Product")



const addToCart = async(req,res)=>{
    try {
        const {userId,productId,quantity }= req.body;
      
        if(!userId || !productId || !quantity){
            return res.status(400).json({success:false,message:"Invalid data"})
        }
        const product = await Product.findById(productId)
        
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        let cart = await Cart.findOne({userId})
        if(!cart){
            cart = new Cart({userId,items:[]});
        }
        const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString()===productId);
        if(findCurrentProductIndex==-1){
            cart.items.push({productId,quantity})
        }else{
            cart.items[findCurrentProductIndex].quantity += quantity;
                      
        }
        await cart.save()
        res.status(200).json({success:true,data:cart})

        } catch (error) {
            console.log(error)
        res.status(500).json({success:false,message:"Error Occured"})
    }
}
const fetchCartItems = async(req,res)=>{
    try {
        const{userId}=req.params;
        if(!userId){
            return res.status(404).json({success:false,message:"user id is mandatory"})
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image name price salePrice",
          });
        if(!cart){
            return res.status(404).json({success:false,message:"Cart not found"})
        }

        const validItems = cart.items.filter(productItem=>productItem.productId);
        if(validItems.length<cart.items.length){
            cart.items=validItems;
            await cart.save()
        }
        const populateCartItems = validItems.map(item=>({
            productId:item.productId._id,
            image :item.productId.image , 
            name:item.productId.name,
            price:item.productId.price,
            salePrice:item.productId.salePrice,
            quantity:item.quantity,
        }))
        res.status(200).json({success:true,data:{
            ...cart._doc,
            items:populateCartItems,
                        
        }})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error Occured"})
    }
}
const updateCartItemQty = async(req,res)=>{
    try {
        const {userId,productId,quantity }= req.body;
        if(!userId || !productId || !quantity){
            return res.status(400).json({success:false,message:"In sufficient data"})
        }
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({success:false,message:"Cart not found"})
        }
        const findCurrentProductIndex = cart.items.findIndex(item=>item.productId._id.toString()===productId)
        if(findCurrentProductIndex===-1){
            return res.status(404).json({success:false,message:"item not found in cart"})
        }
        cart.items[findCurrentProductIndex].quantity=quantity;
        await cart.save();
        await cart.populate({
            path:"items.productId",
            select:"image name price salePrice"
        });
        
        const populateCartItems = cart.items.map(item=>({
            productId :item.productId ?item.productId._id : null,
            image :item.productId ?item.productId.image : null,
            name :item.productId ?item.productId.name :"Product not found",
            price :item.productId ?item.productId.price : null,
            salePrice :item.productId ?item.productId.salePrice : null,
            quantity :item.quantity ?item.quantity  : null,
        }))
        res.status(200).json({success:true,data:{
            ...cart._doc,
            items:populateCartItems, 
        }})

        
    } catch (error) {
        res.status(500).json({success:false,message:"Error Occured"})
    }
}
const deleteCartItem = async(req,res)=>{
    try {
        const {userId,productId}=req.params;
        if(!userId ||!productId){
            return res.status(400).json({success:false,message:"In sufficient data"})
        }
        const cart = await Cart.findOne({userId}).populate({
            path:"items.productId",
            select:"image name price salePrice"
        })
        if(!cart){
            return res.status(404).json({success:false,message:"Cart not found"})
        }
      
       cart.items = cart.items.filter(item=> item.productId._id?.toString() !==productId)
        await cart.save()
        await cart.populate({
            path:"items.productId",
            select:"image name price salePrice"
        });
        const populateCartItems = cart.items.map(item=>({
            productId :item.productId ?item.productId._id : null,
            image :item.productId ?item.productId.image : null,
            name :item.productId ?item.productId.name :"Product not found",
            price :item.productId ?item.productId.price : null,
            salePrice :item.productId ?item.productId.salePrice : null,
            quantity :item.quantity ?item.quantity  : null,
        }))
        res.status(200).json({success:true,data:{
            ...cart._doc,
            items:populateCartItems, 
        }})


        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error Occured"})
    }
}

module.exports = {addToCart,fetchCartItems,updateCartItemQty,deleteCartItem}