import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatured from "./pages/admin-view/featured";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingListing from "./pages/shopping-view/listing";
import CheckAuth from "./components/common/chek-auth";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/authSlice";
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturn from "./components/shopping-view/paypal-return";
import PaymentSuccessPage from "./components/shopping-view/payment-success";
import SearchProductsPage from "./pages/shopping-view/search";


function App() {
 
  const {isAuthenticated,user,isLoading}=useSelector(state=>state.auth)
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = JSON.parse(sessionStorage.getItem("token"))
   
    dispatch(checkAuth(token))
  },[dispatch])
  if(isLoading){
    return <Skeleton className="w-full h-[600px]" />

  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common component */}
    
      <Routes>
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}/>}></Route>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}> <AuthLayout/></CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}> <AdminLayout/></CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="featured" element={<AdminFeatured />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}> <ShoppingLayout /></CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProductsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;