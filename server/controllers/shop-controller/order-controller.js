    const Order = require("../../models/orders");
    const paypal = require("../../helpers/paymentpaypal.js");
    const Cart = require("../../models/Cart.js")
    const Product = require("../../models/Product.js")

const createOrder = async(req,res)=>{
    try{
        const {userId,cartItems,addressInfo,orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId        } = req.body;

         const create_payment_json ={
            intent : "sale",
            payer :{
                payment_method : "paypal"
            },
            redirect_urls :{
                return_url : `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
                cancel_url : `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`
            },
            transactions: [
                {
                item_list: {
                    items: cartItems.map(item=>({
                        name: item.name,
                        sku: item.productId,
                        price: item.price.toFixed(2),
                        currency: "USD",
                        quantity: item.quantity
                    }))           
                     },
                amount: {
                    currency: "USD",
                    total: totalAmount.toFixed(2),
                },
                description: "This is the payment description."
            }]
         }   
      

paypal.payment.create(create_payment_json, async (error, paymentInfo) =>{
    if (error) {
       console.log("paypal error details",error)
      return res.status(500).json({success:true,message:"error occoured while payment with paypal"})
    } else {
        const newlyCreatedOrder = new Order({
            userId,cartItems,addressInfo,orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId
        })
        await newlyCreatedOrder.save()

        const approvalURL = paymentInfo.links.find(link=>link.rel==="approval_url").href;
        res.status(201).json({success:true,approvalURL,orderId:newlyCreatedOrder._id})
   
    }
});
    }catch(error){
        console.log(error)
        res.status(500).json({success:true,message:"error occoured"})
    }
}
const capturePayment = async(req,res)=>{
    try{
        const {paymentId,payerId,orderId}=req.body
        let order = await Order.findById(orderId)
        
        if(!order){
            return res.status(404).json({success:false,message:"Order not found"})
        }
        order.paymentStatus="paid";
        order.orderStatus="confirmed";
        order.paymentId=paymentId;
        order.payerId=payerId;

        for(let item of order.cartItems){
            const product = await Product.findById(item.productId)
            if(!product){
                return res.status(404).json({success:false,message:"Not enough stock for current quantity"})
            }
            product.totalStock -=item.quantity;
            await product.save()
        }


        let getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);

        await order.save()
        res.status(200).json({success:true,message:"Payment captured successfully",data:order})
    }catch(error){
        console.log(error)
        res.status(500).json({success:true,message:"error occoured"})
    }
}
const getAllOrdersByUser = async (req,res)=>{
    try{
        const {userId} = req.params;
        const orders = await Order.find({userId})
        if(!orders.length){
            res.status(400).json({success:false,message:"No order found"})
        }
        res.status(200).json({success:true,data:orders})

    }catch(e){
        console.log(e)
       return res.status(500).json({success:true,message:"error occoured"})
    }
}
const getOrderDetails = async (req,res)=>{
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
module.exports = {createOrder,capturePayment,getAllOrdersByUser,getOrderDetails}