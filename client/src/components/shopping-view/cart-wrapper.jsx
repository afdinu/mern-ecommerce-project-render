import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader } from "../ui/sheet";
import UserCartItemsContent from "./cart-item-content";


function UserCartWrapper({cartItems,setOpenCartSheet}) {
    const navigate = useNavigate()
    const totalAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum,currentItem)=>
      sum + (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price) *currentItem.quantity,0
    ) : 0
    return (
        <SheetContent side="right" className="sm:max-w-md " >
            <SheetHeader>
                Your Cart
            </SheetHeader>
            <div className="mt-4 space-y-4">
                {
                    cartItems && cartItems.length>0 ?
                    cartItems.map(item=><UserCartItemsContent cartItem = {item} key={item.productId}/>
                    )
                    :null
                }
            </div>
            <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">₹{totalAmount}</span>
                </div>
            </div>
            <Button className="w-full mt-6" onClick={()=>{
                navigate("/shop/checkout")
                setOpenCartSheet(false)
                }} >Checkout</Button>
        </SheetContent>
    );
}

export default UserCartWrapper;