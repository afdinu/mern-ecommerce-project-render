import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop-slice/carts/cartSlice";
import { fetchProductDetails } from "@/store/shop-slice/products/productSlice";
import { getSearchResults, resetSearchResults } from "@/store/shop-slice/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


function SearchProductsPage() {
    const [keyword,setKeyword]= useState("")
    const [searchParams,setSearchParams]= useSearchParams()
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { productDetails } = useSelector(state => state.shopProducts)
    const [openProductDetailsDialog, setOpenDetailsDialog] = useState(false)
    const {searchResults} = useSelector(state=>state.shopSearch)
    const {cartItems} = useSelector(state=>state.shopCart)
    const { user } = useSelector(state => state.auth)

    function handleAddToCart(getCurrentProduct) {
        console.log(getCurrentProduct)
        for(let item of cartItems.items){
            if(item.productId ==getCurrentProduct._id){
                if(item.quantity==getCurrentProduct.totalStock){
                    toast({
                        title: "Cannot add more than available quantity",
                        variant:"destructive"
                    })
                        return;
                }
            }
        }
        dispatch(addToCart({ userId: user.id, productId: getCurrentProduct._id, quantity: 1 })).then(data => {


            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({
                    title: "Product added to cart successfully",
                    variant: "success"
                })
                
            }
        })
    }
    function handleProductDetails(getCurrentProductId) {
        // console.log(getCurrentProductId)
        dispatch(fetchProductDetails(getCurrentProductId))
    }

    useEffect(()=>{
        if(keyword && keyword.trim()!=="" && keyword.length>3 ){
           setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
           },1000) 
        }else{
            dispatch(resetSearchResults())
            setSearchParams("")
        }

    },[keyword])
    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true)
        }
    }, [productDetails])

    return ( 
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input className="py-6" value={keyword} name="keyword" onChange={(event)=>setKeyword(event.target.value)} placeholder="Search Products"/>
              
                </div>
            </div>
            {
                !searchResults.length ? <h1 className="text-5xl font-extrabold">No Products Found...</h1> :null
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                
                searchResults.map(item=> <ShoppingProductTile key={item._id} productItem={item} handleProductDetails={handleProductDetails} handleAddToCart={handleAddToCart}/>) 
                }
                <ProductDetailsDialog handleAddToCart={handleAddToCart} productDetails={productDetails} open={openProductDetailsDialog} setOpen={setOpenDetailsDialog} />
            </div>
        </div>
     );
}

export default SearchProductsPage;