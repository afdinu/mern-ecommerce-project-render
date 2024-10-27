import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin-slice/order-slice";
import { toast } from "@/hooks/use-toast";

const initialFormData = {
    status: ""
}
function AdminOrderDetailsView({orderDetails}) {

    const [formData, setFormData] = useState(initialFormData)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    function handleOrderStatus(event) {
        event.preventDefault()
        const {status} = formData;
      dispatch(updateOrderStatus({id:orderDetails._id,orderStatus:status})).then((data)=>{
        if(data?.payload?.success){
            dispatch(getOrderDetailsForAdmin(orderDetails._id))
            setFormData(initialFormData)
            toast({
                title:data.payload.message
            })
        }
      })
    }

    return (
        <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-scroll">
            <div className="grid gap-6">
            <div className="grid gap-2">
                    <div className="flex justify-between items-center mt-6">
                        <p className="font-medium">Order Id</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge className={`py-1 px-2 ${orderDetails?.orderStatus === "confirmed" ? "bg-green-500" : null}`}>{orderDetails?.orderStatus}</Badge>
                        </Label>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">Payment Method </p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">Payment Status </p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">Order Price</p>
                        <Label>₹{orderDetails?.totalAmount}</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? orderDetails?.cartItems.map(item => (
                                        <TableRow key={item.productId} className="">
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>₹{item.price}</TableCell>
                                        </TableRow>
                                    )) : null
                                }
                            </TableBody>
                        </Table>


                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">

                        <div className="flex flex-col text-muted-foreground]">
                            <span>{user?.userName}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Status</div>
                        <CommonForm formControls={[{
                            name: "status",
                            label: "Order Status",
                            componentType: "select", // Dropdown menu
                            options: [               // Categories or dynamic list from API
                                { id: "pending", label: "Pending" },
                                { id: "inProcess", label: "Inprocess" },
                                { id: "inShipping", label: "In Shipping" },
                                { id: "deliverd", label: "Delivered " },
                                { id: "rejected", label: "rejected" },
                            ]
                        },]} formData={formData} setFormData={setFormData} onSubmit={handleOrderStatus} buttonText={"Update Order Status"} />

                    </div>
                </div>
            </div>

        </DialogContent>
    );
}

export default AdminOrderDetailsView;