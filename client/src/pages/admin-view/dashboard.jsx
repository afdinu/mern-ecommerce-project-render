import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addFeatureImage, getFeatureImages } from "@/store/common/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [imageUploadingState, setImageUploadingState] = useState(null);
    const { featureImages } = useSelector(state => state.commonFeature)
    const dispatch = useDispatch()
    console.log(featureImages)




    function handleUploadFetaureImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if(data?.payload?.success){
                toast({
                    title: "Image uploaded successfully"
                })
                setImageFile(null)
                setUploadedImageUrl(null)
                setImageUploadingState(null)
                dispatch(getFeatureImages())
            }
        })
    }
    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch])


    return (
        <div>
            <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
                imageUploadingState={imageUploadingState}
                setImageUploadingState={setImageUploadingState}
            // isEditMode={currentEditedId !==null}
            />
            <Button className="mt-5 w-full" onClick={handleUploadFetaureImage}>Upload</Button>
            
            <div className="d-flex gap-6 mt-5">
                {
                    featureImages && featureImages.length>0 ?featureImages.map(featureimgItem=>
                        <div key={featureimgItem._id} className="">
                            <img src={featureimgItem?.image} className="w-full"></img>
                        </div>
                    ):null
                }
            </div>


        </div>
    );
}

export default AdminDashboard;