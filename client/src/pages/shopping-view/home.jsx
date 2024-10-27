import { AccessibilityIcon, Aperture, BabyIcon, Biohazard, BookHeart, Cable, Check, ChevronLeftIcon, ChevronRightIcon, FootprintsIcon, Heading4, ShirtIcon, TreeDeciduous, } from "lucide-react";
// import banner1 from "/banner/banner-1.webp"
// import banner2 from "/banner/banner-2.webp"
// import banner3 from "/banner/banner-3.webp"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop-slice/products/productSlice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop-slice/carts/cartSlice";
import { getFeatureImages } from "@/store/common/common-slice";

const categoriesWithIcon = [

    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: BookHeart },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: AccessibilityIcon },
    { id: "footwear", label: "Footwear", icon: FootprintsIcon },
]
const  brandsWithIcon= [
    {id: "nike",label: "Nike",icon: Check},
    {id: "adidas",label: "Adidas",icon: TreeDeciduous},
    {id: "puma",label: "Puma", icon: Aperture },
    {id: "levi",label: "Levi's",icon: Cable },
    {id: "zara",label: "Zara",icon: Biohazard },
    {id: "h&m",label: "H&M",icon: Heading4 },
]
function ShoppingHome() {
    // const featureImages = [banner1, banner2, banner3]
    const [currentSlide, setCurrentSlide] = useState(0)
    const {productsList,productDetails} = useSelector(state=>state.shopProducts)
    const {user} = useSelector(state=>state.auth)
    const { featureImages } = useSelector(state => state.commonFeature)

    const [openProductDetailsDialog, setOpenDetailsDialog] = useState(false)
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const {toast} = useToast()

    function handleNavigateToListingPage(getCurrentItem,section){
            sessionStorage.removeItem("filters");
            const currentFilter ={
                [section]:[getCurrentItem.id]
            }
            sessionStorage.setItem("filters",JSON.stringify(currentFilter))
            navigate("/shop/listing")
    }
    function handleProductDetails(getCurrentProductId) {
        // console.log(getCurrentProductId)
        dispatch(fetchProductDetails(getCurrentProductId))
    }
    function handleAddToCart(getCurrentProductId) {
        // console.log(getCurrentProductId,user.id,1)
        dispatch(addToCart({ userId: user.id, productId: getCurrentProductId, quantity: 1 })).then(data => {


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
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % featureImages.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])
    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({filterParams:{},sortParams:"price-lowtohigh"}))
    },[dispatch])
    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true)
        }
    }, [productDetails])
    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch])
    console.log(featureImages)

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden ">
                { featureImages && featureImages.length>0 ? featureImages.map((slide, index) => (
                        <img key={index} src={slide?.image} alt="" className={`${currentSlide === index ? "opacity-100" : "opacity-0 "} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 `} />
                    )) : null

                }

                <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + featureImages.length) % featureImages.length)}
                    variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-20 bg-inherit" >
                    <ChevronLeftIcon />
                </Button>
                <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % featureImages.length)}
                    variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-20 bg-inherit" >
                    <ChevronRightIcon />
                </Button>

            </div>
            <section className=" py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-8">Shop by Category</h3>
                    <div className="grid grid-cols2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {
                            categoriesWithIcon.map(categoryItem => <Card onClick ={()=>handleNavigateToListingPage(categoryItem,"category")}
                            className="cursor-pointer hover:shadow-lg">
                                <CardContent className="flex flex-col justify-center items-center p-6">
                                    <categoryItem.icon className=" h-12 w-12 text-primary mb-4" />
                                    <span className="font-bold" >{categoryItem.label}</span>

                                </CardContent>

                            </Card>)
                        }
                    </div>
                </div>

            </section>
            <section className=" py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-8">Shop by Brands</h3>
                    <div className="grid grid-cols2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {
                            brandsWithIcon.map(brandItem => <Card onClick ={()=>handleNavigateToListingPage(brandItem,"brand")}
                            className="cursor-pointer hover:shadow-lg">
                                <CardContent className="flex flex-col justify-center items-center p-6">
                                    <brandItem.icon className=" h-12 w-12 text-primary mb-4" />
                                    <span className="font-bold" >{brandItem.label}</span>

                                </CardContent>

                            </Card>)
                        }
                    </div>
                </div>

            </section>
            <section className="py-12" >
            <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Featured Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    productsList && productsList.length > 0 ? productsList.map(productItem=>
                       <ShoppingProductTile productItem={productItem} handleAddToCart={handleAddToCart} handleProductDetails={handleProductDetails}/>
                    ):null
                }
            </div>
            <ProductDetailsDialog productDetails={productDetails} open={openProductDetailsDialog} setOpen={setOpenDetailsDialog} />
            </div>
            </section>
        </div>
    );
}

export default ShoppingHome;