import { useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { capturePayment } from "@/store/shop-slice/order-slice";
import { useLocation } from "react-router-dom";

function PaypalReturn() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const paymentId = params.get("paymentId")
    const payerId = params.get("PayerID")
   
    useEffect(()=>{
        if(payerId && paymentId){
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))
            dispatch(capturePayment({payerId,paymentId,orderId})).then((data)=>{
               if(data?.payload?.success){
                sessionStorage.removeItem("currentOrderId");
                window.location.href = "/shop/payment-success"
               }
            })
        }
    })
    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Payment is processing......Please Wait!!!</CardTitle>
            </CardHeader>
        </Card>
     );
}

export default PaypalReturn;