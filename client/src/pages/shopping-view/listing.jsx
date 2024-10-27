import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop-slice/products/productSlice";
import { addToCart, fetchCartItems } from "@/store/shop-slice/carts/cartSlice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


function createSearchParamsHelper(filterParams) {
    const queryParams = []
    for (let [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",")
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }


    }
    return queryParams.join("&")

}


function ShoppingListing() {

    //  fetch list of products
    const dispatch = useDispatch();
    const { toast } = useToast()
    const { productsList, productDetails } = useSelector(state => state.shopProducts)

    const { user } = useSelector(state => state.auth)
    const [sort, setSort] = useState(null)
    const [filter, setFilter] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [openProductDetailsDialog, setOpenDetailsDialog] = useState(false)
    const categorySearchParams = searchParams.get("category")
    const {cartItems} = useSelector(state=>state.shopCart)
    // console.log(cartItems)
    // console.log(productsList)
    function handleSort(value) {
        setSort(value)
    }
    function handleFilter(getSectionId, getCurrentOption) {
        // console.log(getSectionId,getCurrentOption)

        let cpyFilter = { ...filter }


        let indexOfCurrentSection = Object.keys(cpyFilter).indexOf(getSectionId);
        if (indexOfCurrentSection === -1) {
            cpyFilter = {
                ...cpyFilter, [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentOption = cpyFilter[getSectionId].indexOf(getCurrentOption)
            if (indexOfCurrentOption === -1) {
                cpyFilter[getSectionId].push(getCurrentOption)
            } else {
                cpyFilter[getSectionId].splice(indexOfCurrentOption, 1)
            }
        }
        setFilter(cpyFilter);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilter))


    }
    function handleProductDetails(getCurrentProductId) {
        // console.log(getCurrentProductId)
        dispatch(fetchProductDetails(getCurrentProductId))
    }
    function handleAddToCart(getCurrentProduct) {
        console.log(cartItems , getCurrentProduct)
       
        if(cartItems && cartItems?.items?.length>0) {
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
        }}
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
        useEffect(()=>{
            if(user?.id){
                dispatch(fetchCartItems(user?.id))
            }
        },[dispatch])



    useEffect(() => {
        setSort("price-lowtohigh");
        setFilter(JSON.parse(sessionStorage.getItem("filters")) || {})
    }, [categorySearchParams])
    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            const createQueryString = createSearchParamsHelper(filter)
            setSearchParams(new URLSearchParams(createQueryString))

        }
    }, [filter])

    useEffect(() => {
        if (filter !== null && sort !== null) {

            dispatch(fetchAllFilteredProducts({ filterParams: filter, sortParams: sort }))
        }
    }, [dispatch, filter, sort])
    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true)
        }
    }, [productDetails])
    //    console.log(productDetails,"productDetails")


    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filter={filter} handleFilter={handleFilter} />
            <div className=" bg-background rounded-lg w-full shadow-sm">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-extrabold">
                        All Products
                    </h2>
                    <div className="flex items-center gap-3 ">
                        <span className="text-muted-foreground">
                            10 Products
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1" >
                                    <ArrowUpDown className="h-4 w-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {
                                        sortOptions.map(sortItem => (
                                            <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                                                {sortItem.label}
                                            </DropdownMenuRadioItem>
                                        ))
                                    }

                                </DropdownMenuRadioGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
                    {
                        productsList && productsList.length > 0 ? productsList.map(productItem => (
                            <ShoppingProductTile key={productItem._id} productItem={productItem} handleProductDetails={handleProductDetails} handleAddToCart={handleAddToCart} />
                        )) : null
                    }
                </div>
                <ProductDetailsDialog handleAddToCart={handleAddToCart} productDetails={productDetails} open={openProductDetailsDialog} setOpen={setOpenDetailsDialog} />
            </div>

        </div>
    );
}

export default ShoppingListing;