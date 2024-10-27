
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";


function ShoppingProductTile ({productItem,handleProductDetails,handleAddToCart}) {


 
    return ( 
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={()=>handleProductDetails(productItem?._id)}>
                <div className="relative">
                    <img src={productItem?.image} alt={productItem?.title} className="w-full h-[300px] object-cover rounded-t-lg" />

                {  productItem.totalStock===0 ? <Badge className=" absolute top-2 left-2 bg-gray-500 hover:bg-gray-600">Out of Stock </Badge>:                
                productItem.totalStock<10 ? <Badge className=" absolute top-2 left-2 bg-red-500 hover:bg-red-600">Only {productItem.totalStock} left in Stock </Badge> :
                    productItem.salePrice>0? 
                    <Badge className=" absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>:null
                }
                </div>
            </div>
            <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-2 capitalize">{productItem?.name}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground capitalize">{productItem?.category}</span>
                    <span className="text-sm text-muted-foreground capitalize">{productItem?.brand}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className={`${productItem.salePrice>0 ? "line-through" : ""} text-lg font-semibold text-primary`} >{productItem?.price}</span>
                    {
                        productItem.salePrice > 0 ?<span className="text-lg font-semibold text-primary">{productItem.salePrice}</span> :null
                    }
                    
                </div>
            </CardContent>
            <CardFooter>
                { productItem.totalStock===0 ?  <Button className="w-full cursor-not-allowed opacity-60" >
                    Add to cart
                </Button>:
                <Button className="w-full" onClick={()=>handleAddToCart(productItem)}>
                    Add to cart
                </Button>

                }
                </CardFooter>            
        </Card>
     );
}

export default ShoppingProductTile ;