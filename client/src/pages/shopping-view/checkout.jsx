import Address from "@/components/shopping-view/addres";
import img from "../../assets/account.jpg"
import UserCartItemsContent from "@/components/shopping-view/cart-item-content";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createNewOrder } from "@/store/shop-slice/order-slice";
import { fetchCartItems } from "@/store/shop-slice/carts/cartSlice";
import { useToast } from "@/hooks/use-toast";

function ShoppingCheckout() {
    const { cartItems } = useSelector(state => state.shopCart)
    const {user}=useSelector(state=>state.auth)
    const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null)
    const [isPaymentStart,setIsPaymentStart]=useState(false)
    const {approvalURL}=useSelector(state=>state.shopOrder)
    const {toast} = useToast()
    const dispatch = useDispatch()

   
    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((sum, currentItem) =>
        sum + (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price) * currentItem.quantity, 0
    ) : 0
    function handleInitialPaypalPayment(){
        if(cartItems.length==0){
            toast({
                title:"Cart is empty. Please add some items to proceed.",
                variant:"destructive"
            })
            return;
        }
        if (!currentSelectedAddress) {
            toast({
                title:"Please select a shipping address before proceeding.",
                variant:"destructive"
            })
            return;
            
        }
        const orderData = {
            userId:user.id,
            cartItems:cartItems.items.map(singleCartItem=>({
                productId:singleCartItem?.productId,
                name:singleCartItem?.name,
                image:singleCartItem?.image,
                price:singleCartItem?.salePrice>0?singleCartItem?.salePrice:singleCartItem?.price,
                quantity:singleCartItem?.quantity,
            })),
            addressInfo:{
                addressId:currentSelectedAddress?._id,
                address:currentSelectedAddress?.address,
                city:currentSelectedAddress?.city,
                pincode:currentSelectedAddress?.pincode,
                phone:currentSelectedAddress?.phone,
                notes:currentSelectedAddress?.notes,
            },
            orderStatus:"pending",
            paymentMethod:"paypal",
            paymentStatus:"pending",
            totalAmount:totalCartAmount,
            orderDate:new Date(),
            orderUpdateDate:new Date(),
            paymentId:"",
            payerId:"",
            cartId:cartItems?._id
        }
        // console.log(orderData )
        dispatch(createNewOrder(orderData)).then((data)=>{
            console.log(data)
            if(data.payload.success){
                setIsPaymentStart(true)
            }else{
                setIsPaymentStart(false)
            }
        })
    }
    useEffect(()=>{
        dispatch(fetchCartItems(user.id))
    },[dispatch])
    if(approvalURL){
        console.log(approvalURL)
        window.location.href=approvalURL
    }
  

    return (
        <div className="flex flex-col">
            <div className="relative h -[300px] w-full overflow-hidden">
                <img src={img} alt="img" className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address selectId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
                <div className="mt-4 space-y-4">
                    {
                        cartItems && cartItems.items && cartItems.items.length > 0 ?
                            cartItems.items.map(item => <UserCartItemsContent cartItem={item} />
                            )
                            : null
                    }
                    <div className="mt-4 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">₹{totalCartAmount}</span>
                        </div>
                    </div>
                    <div className="w-full mt-6">
                        <Button className="w-full" onClick={handleInitialPaypalPayment}>
                            {
                                isPaymentStart?"Payment is processing, please wait ....." :"CheckOut with Paypal"
                            }
                            
                            </Button>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;