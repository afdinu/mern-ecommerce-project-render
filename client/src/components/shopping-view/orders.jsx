import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-detailsDialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetDetails } from "@/store/shop-slice/order-slice";
import { Badge } from "../ui/badge";

 function ShoppingOrders() {
    const [openShoppingDetailDialog, setOpenShoppingDetailsDialog] = useState(false)
    const dispatch = useDispatch();
    const { user }= useSelector(state=>state.auth)
    const {orderList,orderDetails} = useSelector(state=>state.shopOrder)

    function handleFetchOrderDetails(getId){
        dispatch(getOrderDetails(getId))

    }
    
    useEffect(()=>{
        dispatch(getAllOrdersByUserId(user.id)).then((data)=>{

        })
    },[dispatch])
    useEffect(()=>{
        if(orderDetails!==null){
            setOpenShoppingDetailsDialog(true)
            
        }
    },[orderDetails])
    console.log(orderDetails)
    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                        orderList && orderList.length> 0 ? orderList.map(orderItem =>{
                         return   <TableRow>
                        
                            <TableCell>{orderItem?._id}</TableCell>
                            <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                            <TableCell>
                                <Badge className={`py-1 px-2 ${orderItem?.orderStatus==="confirmed"?"bg-green-500": null}`}>{orderItem?.orderStatus}</Badge>
                            </TableCell>
                            <TableCell>₹{orderItem?.totalAmount}</TableCell>
                            <TableCell>
                                <Dialog open={openShoppingDetailDialog} onOpenChange={()=>{setOpenShoppingDetailsDialog(false)
                                    dispatch(resetDetails())
                                }}>

                                <Button onClick={()=>handleFetchOrderDetails(orderItem._id)}>Details</Button>
                                <ShoppingOrderDetailsView orderDetails={orderDetails}/>
                                </Dialog>
                            </TableCell>
                           
                        </TableRow>
                        })
                        :null
                    }

                       
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
    );
 }
 
 export default ShoppingOrders;