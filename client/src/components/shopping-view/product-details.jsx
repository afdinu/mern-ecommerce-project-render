import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop-slice/carts/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop-slice/products/productSlice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop-slice/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails , handleAddToCart }) {
    const [reviewMsg,setReviewMsg] = useState("")
    const [rating, setRating] = useState(0)
    const {reviews} = useSelector(state=>state.shopReview)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const { toast } = useToast()

    const averageReview = reviews && reviews.length>0 ? reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/ reviews.length:0

      function handleDialogClose() {
        setOpen(false)
        dispatch(setProductDetails(null))
        setRating(0)
        setReviewMsg("")
    }
    function handleRatingChange(getRating){
        setRating(getRating)
    }
    function handleAddReview(){
        const data = {
            userId:user.id,
            productId:productDetails._id,
            userName:user.userName,
            reviewMessage:reviewMsg,
            reviewValue:rating
        }
        dispatch(addReview(data)).then((data)=>{
            if(data?.payload?.success){
                setRating(0)
                setReviewMsg("")
                dispatch(getReviews(productDetails._id))
                toast({
                    title: "Review added successfully"
                })
            }
        })
    }
    useEffect(()=>{
        if(productDetails!==null){
            dispatch(getReviews(productDetails._id))
        }
    },[productDetails])
   
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]  ">
                <div className="relative overflow-hidde rounded-lg">
                    <img src={productDetails?.image} alt={productDetails?.name}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />

                </div>
                <div className=" ">
                    <div>

                        <h1 className="text-3xl font-extrabold">{productDetails?.name}</h1>
                        <p className="text-muted-foreground mt-4 mb-5">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`${productDetails?.salePrice > 0 ? "line-through text-muted-foreground" : ""} text-xl font-extrabold`}>₹{productDetails?.price}</p>

                        {
                            productDetails?.salePrice > 0 ?
                                <p className="text-xl font-extrabold">₹{productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className="flex gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarRatingComponent rating={averageReview}/>

                        <span>{(averageReview.toFixed(1))}</span>
                        </div>
                    </div>
                    <div className="my-5">
                        {productDetails?.totalStock === 0 ? <Button className="w-full cursor-not-allowed opacity-60" >
                           Out of Stock
                        </Button> :

                            <Button onClick={() => handleAddToCart(productDetails)} className="w-full">Add to Cart</Button>
                        }
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className="grid gap-6">
                            {
                                reviews && reviews.length>0 ?
                                reviews.map(reviewItem=>
                                    <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>
                                    
                                        {reviewItem?.userName?.charAt(0).toUpperCase()}

 
                                    </AvatarFallback>

                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3>{reviewItem?.userName}</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                       <StarRatingComponent rating={reviewItem?.reviewValue}/>

                                    </div>
                                    <p className="text-muted-foreground">{reviewItem?.reviewMessage}</p>
                                </div>

                            </div>
                                )
                                :<h1>No review found</h1>
                            }
                            
                          

                        </div>
                        <div className="flex flex-col gap-2 mt-10 px-2">
                            <Label>Write a review</Label>
                            <div className="flex gap-1">
                                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange}/>
                            </div>

                            <Input name="reviewMsg" value={reviewMsg} onChange = {(event)=>setReviewMsg(event.target.value)} placeholder="Write your review " />
                            <Button onClick = {handleAddReview} disabled={reviewMsg.trim()==""} >Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default ProductDetailsDialog;