import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";


function AddressCard({addressInfo,handleDeleteAddress,handleEditAddress,setCurrentSelectedAddress,selectId}) {
   
   
    return (
        <Card onClick={setCurrentSelectedAddress ?()=>setCurrentSelectedAddress(addressInfo):null} className={`cursor-pointer ${selectId?._id==addressInfo?._id?"border-black":null}`}>
            <CardContent className="grid gap-4 p-4">
            <Label>Address: {addressInfo.address}</Label>
            <Label>City: {addressInfo.city}</Label>
            <Label>Pincode: {addressInfo.pincode}</Label>
            <Label>Contact: {addressInfo.phone}</Label>
            <Label>Instructions: {addressInfo.notes}</Label>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-3">
                <Button onClick={()=>handleEditAddress(addressInfo) } >Edit</Button>
                <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
            </CardFooter>
        </Card>
      );
}

export default AddressCard;