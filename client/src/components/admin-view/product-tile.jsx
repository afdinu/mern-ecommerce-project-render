import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { deleteProduct, fetchAllProducts } from "@/store/admin-slice/product-slice";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";




function AdminProductTile({ 
    product,setCurrentEditedId,
    setOpenCreateProductDialog,
    setFormData
     })
    
    {
        const dispatch = useDispatch();
        const {toast}=useToast()
        const handleDelete=(id)=>{
            dispatch(deleteProduct(id)).then(()=>{
            dispatch(fetchAllProducts())
            toast({
                title:"Product deleted successfully"
            })
            })

        }
    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])

    return (
        <Card>
            <div>
                <div className="relative">
                    <img src={product?.image} alt={product?.name} className="w-full h-[300px] object-cover rounded-t-lg" />
                </div>
            </div>
            <CardContent>
                <h2 className=" text-xl font-bold mb-2 mt-2">{product?.name}</h2>
                <div className="flex justify-between gap-2 items-center mb-2">
                    <span className={`${product?.salePrice > 0 ? "line-through" : ""}  text-lg font-semibold text-primary`}>${product.price}</span>
                    {product.salePrice > 0 ?
                        <span className="text-xl font-bold">${product.salePrice}</span> : null

                    }
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <Button onClick={()=>{setCurrentEditedId(product._id)
                    setOpenCreateProductDialog(true)
                    setFormData(product)
                }}>Edit</Button>
                <Button onClick={()=>handleDelete(product._id)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;