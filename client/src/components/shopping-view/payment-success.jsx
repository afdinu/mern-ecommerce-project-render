import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";



function PaymentSuccessPage() {

    const navigate = useNavigate()
    return (  
        <Card className="container m-2 p-5">
            <CardHeader>
                <CardTitle>Payment Successful</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Your payment has been successful. Your order will be processed shortly.</p>
            </CardContent>
            <CardFooter>
                <Button onClick={()=>navigate("/shop/account")} className="">View Orders</Button>
            </CardFooter>
        </Card>
    );
}

export default PaymentSuccessPage;