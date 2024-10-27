import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/admin-slice/product-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
}

function AdminProducts({ }) {

    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [imageUploadingState, setImageUploadingState] = useState(null);
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const dispatch = useDispatch();
    const { productsList } = useSelector(state => state.adminProducts)
    const { toast } = useToast()



    function onSubmit(event) {
        event.preventDefault()

        currentEditedId!==null?
        dispatch(editProduct(
            {id:currentEditedId,formData}))
        .then((data)=>{
            console.log(data.payload)
            if(data?.payload?.success){
                dispatch(fetchAllProducts())
                setCurrentEditedId(null)
                setFormData(initialFormData)
                setOpenCreateProductDialog(false)
                toast({
                    title:"Product Edited Successfully"
                })
            }
        })
            :
        dispatch(addNewProduct(
            { ...formData, image: uploadedImageUrl }
        )).then((data) => {
           
            if (data?.payload?.success) {
                dispatch(fetchAllProducts())
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateProductDialog(false)
                toast({
                    title: "Product added successfully"
                })
            }
        })
    }

    function isFormValid(){
     return   Object.keys(formData).map(key=>formData[key]!=="").every(item=>item)
    }
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])
  
    // console.log(formData, "productList")

    return (
        <Fragment>
            <div className="flex mb-5 justify-end w-full">

                <Button onClick={() => setOpenCreateProductDialog(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productsList && productsList.length > 0 ?
                        productsList.map(product => <AdminProductTile 
                            key={product?._id}
                        product={product} 
                        setCurrentEditedId={setCurrentEditedId}
                        setOpenCreateProductDialog={setOpenCreateProductDialog}
                        setFormData={setFormData}

                        />) : null
                }

            </div>
            <Sheet open={openCreateProductDialog} onOpenChange={() => {
                setOpenCreateProductDialog(false)
                setCurrentEditedId(null)
                setFormData(initialFormData)
                setImageFile(null);
            }
            }>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedId? "Edit Product" : "Add New Product"
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
                        imageUploadingState={imageUploadingState}
                        setImageUploadingState={setImageUploadingState}
                        isEditMode={currentEditedId !==null}
                    />
                    <div className="py-6">
                        <CommonForm formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={currentEditedId?"Edit":"Add"} onSubmit={onSubmit}
                        isBtnDisabled={!isFormValid()} ></CommonForm>
                    </div>

                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;