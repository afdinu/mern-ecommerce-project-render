import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"; 
import AdminOrderDetailsView from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetDetails } from "@/store/admin-slice/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
    const[openDetailsDialog,setOpenDetailsDialog] = useState(false)
    const {orderList,orderDetails} = useSelector(state=>state.adminOrder)
    const dispatch = useDispatch();
  
    
    function handleFetchOrderDetails(id){
      
        dispatch(getOrderDetailsForAdmin(id))
    }

    useEffect(()=>{
            dispatch(getAllOrdersForAdmin())
    },[dispatch])
    useEffect(()=>{
        if(orderDetails){
            setOpenDetailsDialog(true)
        }
    },[orderDetails])
    return ( 
        <Card>
        <CardHeader>
            <CardTitle>All orders</CardTitle>
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
                                <Badge className={`py-1 px-2 ${orderItem?.orderStatus==="confirmed"?"bg-green-500":null}`}>{orderItem?.orderStatus}</Badge>
                            </TableCell>
                            <TableCell>₹{orderItem?.totalAmount}</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={()=>{setOpenDetailsDialog(false)
                                    dispatch(resetDetails())
                                    dispatch(getAllOrdersForAdmin())
                                
                                }}>

                                <Button onClick={()=>handleFetchOrderDetails(orderItem._id)}>Details</Button>
                                <AdminOrderDetailsView orderDetails={orderDetails}/>
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
 
 export default AdminOrdersView;