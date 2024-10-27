import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl,imageUploadingState,setImageUploadingState,isEditMode}) {

    const inputRef = useRef(null)

    function handleImageFileChange(event){
        // console.log(event.target.files)
        const selectedFile = event.target.files?.[0];
        // console.log(selectedFile)
      
        if(selectedFile) setImageFile(selectedFile)

    }
    function handleDragOver(event){
        event.preventDefault()
    }
    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0]
        if(droppedFile) setImageFile(droppedFile)
    }
function handleRemoveChange(){
    setImageFile(null);
    if(inputRef.current){
        inputRef.current.value="";
    }

}
async function uploadImageToCloudinary(){
    setImageUploadingState(true)
    const data = new FormData();
    data.append("my_file", imageFile);
    const response =await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,data)
    console.log(response.data)
   if(response?.data?.success){ setUploadedImageUrl(response?.data?.result?.url)
    setImageUploadingState(false)
    }
}


useEffect(()=>{
    if(imageFile!==null) uploadImageToCloudinary()
},[imageFile])

    return ( 
        <div className="w-full ">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4" onDragOver={handleDragOver} onDrop={handleDrop} >
                <Input type="file" id="image-upload" className=" hidden" ref={inputRef} onChange ={handleImageFileChange} disabled={isEditMode}/>

                {
                    !imageFile?
                    <Label htmlFor="image-upload" className={`${isEditMode?"cursor-not-allowed":"cursor-pointer"} flex flex-col items-center justify-center h-32  `} >
                        <UploadCloudIcon className="w-10 h-10 text-muted foreground mb-2"/>
                        <span>Drage & Upload or click to upload</span>
                    </Label>:
                    imageUploadingState? <Skeleton className={"h-10 bg-gray-100"}/>:
                    <div className="flex items-center justify-between"> 
                    <div className="flex items-center">
                        <FileIcon className="w-8 h-8 text-primary mr-2"/>
                    </div>
                    <p className="text-sm font-medium">{imageFile.name}</p>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveChange} >
                        <XIcon className="w-4 h-4"/>
                        <span className="sr-only">Remove File</span>
                    </Button>
                    </div>
                }

            </div>

        </div>
     );
}

export default ProductImageUpload;