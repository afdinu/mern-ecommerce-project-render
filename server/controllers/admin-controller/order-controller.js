const Order = require("../../models/orders");




const getAllOrdersOfAllUsers= async (req,res)=>{
    try{
       
        const orders = await Order.find({})
        if(!orders.length){
           return res.status(400).json({success:false,message:"No order found"})
        }
        res.status(200).json({success:true,data:orders})

    }catch(e){
        console.log(e)
       return res.status(500).json({success:true,message:"error occoured"})
    }
}
const getOrderDetailsForAdmin = async (req,res)=>{
    try{
        const {id } = req.params;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({success:false,message:"Order not found"})
        }
        res.status(200).json({success:true,data:order})
    }catch(e){
        console.log(e)
       return res.status(500).json({success:true,message:"error occoured"})
    }
}
const updateOrderStatus = async (req,res)=>{
    try{
        const {id} = req.params;
        const {orderStatus } = req.body;
        
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({success:false,message:"Order not found"})
        }
        await Order.findByIdAndUpdate(id,{orderStatus})
        return res.status(200).json({success:true,message:"Order status is updated successfully"})

    }catch(e){
        console.log(e)
        return res.status(500).json({success:true,message:"error occoured"})
    }
}
module.exports = {getAllOrdersOfAllUsers,getOrderDetailsForAdmin,updateOrderStatus}