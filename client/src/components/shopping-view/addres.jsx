import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./address-card";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop-slice/address-slice";
import { useToast } from "@/hooks/use-toast";

const initialaddressFormData = {
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: ""
}

function Address({setCurrentSelectedAddress,selectId}) {
    const [formData, setFormData] = useState(initialaddressFormData)
    const [currentEditedId,setCurrentEditedId]=useState(null)
    const dispatch = useDispatch();
    const { addressList } = useSelector(state => state.shopAddress)

    const { user } = useSelector(state => state.auth)
    const { toast } = useToast()

    function handleManageAddress(event) {
        event.preventDefault()

        if(addressList.length>=3 && currentEditedId==null){
            setFormData(initialaddressFormData);
            toast({
                title:"can't add address more than 3",
                variant:"destructive"
            })
            return;  
        }

        currentEditedId !=null ? 
        dispatch(editAddress({userId:user.id,addressId:currentEditedId,formData})).then((data)=>{
            console.log(data)
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user.id)) 
                setFormData(initialaddressFormData)
                setCurrentEditedId(null);
                toast({
                    title: "Address edited successfully"
                })
            }
        })
        :        
        dispatch(addNewAddress({ ...formData, userId: user?.id })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Address added successfully"
                })
                dispatch(fetchAllAddresses(user.id)) 
                setFormData(initialaddressFormData)
            }
        })
    }
    function handleDeleteAddress(getCurrentAddress){
        
        dispatch(deleteAddress({userId:user.id,addressId:getCurrentAddress._id})).then((data)=>{
            if(data?.payload?.success){
                toast({
                    title:"Address Deleted"
                })
                dispatch(fetchAllAddresses(user.id))
            }
        })
    }
    function handleEditAddress(getCurrentAddress){
        
        setCurrentEditedId(getCurrentAddress._id)
       
        setFormData({
            ...formData,
            address:getCurrentAddress.address,
            city: getCurrentAddress.city,
            pincode: getCurrentAddress.pincode,
            phone: getCurrentAddress.phone,
            notes: getCurrentAddress.notes
        })
        // dispatch(deleteAddress({userId:user.id,addressId:getCurrentAddress._id})).then((data)=>{
        //     if(data?.payload?.success){
        //         toast({
        //             title:"Address Deleted"
        //         })
        //         dispatch(fetchAllAddresses(user.id))
        //     }
        // })
    }
    function isFormValid() {
        return Object.keys(formData).map(key => formData[key].trim() !== "").every(item => item)
    }
    useEffect(()=>{
        
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])
    
    // console.log(currentEditedId,"currentEditedId")
    // console.log(addressList,"addressList")
    return (
        <Card>
            <div className="grid grid-cols-1 p-3 mb-5 sm:grid-cols-2 md:grid-cols-2 gap-2">
                {
                    addressList && addressList.length > 0 ? addressList.map(addressInfo => <AddressCard selectId={selectId} setCurrentSelectedAddress={setCurrentSelectedAddress} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} addressInfo={addressInfo} />) : null
                }
            </div>
            <CardHeader>
                {
                    currentEditedId ?"Edit Address":"Add New Address"
                }
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
                <CommonForm formData={formData} setFormData={setFormData} formControls={addressFormControls} onSubmit={handleManageAddress} buttonText={currentEditedId ?"Edit":"Add"} isBtnDisabled={!isFormValid()} />
            </CardContent>
        </Card>
    );
}

export default Address;