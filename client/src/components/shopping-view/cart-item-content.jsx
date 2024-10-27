import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop-slice/carts/cartSlice";
import { useToast } from "@/hooks/use-toast";





function UserCartItemsContent({ cartItem }) {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { productsList } = useSelector(state => state.shopProducts)
    const { toast } = useToast()


    function handleUpdateQuantity(getCurrentItem, typeOfAction) {
        const findProduct = productsList.find(item => item._id == getCurrentItem.productId)
        if (typeOfAction == "plus" && findProduct.totalStock == getCurrentItem.quantity) {
            toast({ title: "Item cannot be add more than available", variant: "destructive" })
            return;
        }

        dispatch(updateCartQuantity({
            userId: user?.id, productId: getCurrentItem.productId, quantity:
                typeOfAction == "minus" ? getCurrentItem.quantity - 1 : getCurrentItem.quantity + 1
        })
        ).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Item quantity updated successfully"
                })
            }
        })
    }

    function handleCartItemDelete(cartItem) {
        //    console.log(user?.id, cartItem.productId,"dinesh")
        dispatch(deleteCartItem({ userId: user?.id, productId: cartItem.productId })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Item removed from cart successfully"
                })
            }
        })

    }

    return (
        <div className='flex items-center space-x-4'>
            <img src={cartItem?.image} alt={cartItem?.name} className="h-20 w-20 rounded object-cover" />
            <div className="flex-1">
                <h3 className="font-extrabold" >{cartItem?.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" disabled={cartItem.quantity == 1}
                        onClick={() => handleUpdateQuantity(cartItem, "minus")}
                    >
                        <Minus className="w-4 h-4 font-bold" />
                        <span className="sr-only" >decrease quantity</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full"
                        onClick={() => handleUpdateQuantity(cartItem, "plus")}
                    >
                        <Plus className="w-4 h-4 font-bold" />
                        <span className="sr-only" >increase quantity</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end" >
                <p>
                    ₹{((cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem.price) * cartItem.quantity).toFixed(2)}
                </p>
                <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
            </div>
        </div>
    );
}

export default UserCartItemsContent;