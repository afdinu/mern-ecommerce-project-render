import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice/authSlice";
import UserCartWrapper from "./cart-wrapper";
import { useState } from "react";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";


function MenuItems({setOpenMenuItems,openMenuItems}) {
    const navigate = useNavigate()
    const location = useLocation();
    const [searchParams,setSearchParams] = useSearchParams();
    function handleNavigate(getCurrentItem){
       
        sessionStorage.removeItem("filters")
        if(openMenuItems){setOpenMenuItems(false)} 
        const currentFilter = getCurrentItem.id !=="home" &&  getCurrentItem.id !=="products" &&  getCurrentItem.id !=="search" ? {
            category:[getCurrentItem.id]
        }:null
        sessionStorage.setItem("filters",JSON.stringify(currentFilter))
        location.pathname.includes("listing") && currentFilter !==null ? setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`)):  navigate(getCurrentItem.path)
    } 
    return (
        <nav className="flex flex-col mb-3 gap-6 lg:mb-0 lg:items-center lg:flex-row">
            {
                shoppingViewHeaderMenuItems.map(menuItem => {
                    return <Label key={menuItem.id} onClick={()=>handleNavigate(menuItem)}  className="text-sm font-medium cursor-pointer">{menuItem.label}</Label>
                })
            }
        </nav>
    )
}

function HeaderRightComponent({setOpenMenuItems,openMenuItems}) {
    const { user } = useSelector(state => state.auth)
    const [openCartSheet,setOpenCartSheet]=useState(false);
    const {cartItems} = useSelector(state=>state.shopCart)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    function handleLogout() {
        // dispatch(logoutUser())
        dispatch(resetTokenAndCredentials())
      sessionStorage.clear()
      navigate("/auth/login")

    }

    // console.log(cartItems.items)

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-6">
            <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false )} >

            <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size="icon" className="relative p-2">
                <ShoppingCart className="h-6 w-6" />
               <Badge className="absolute top-[0px] left-[-30px] bg-red-500"><span className="">{cartItems?.items?.length || 0}</span></Badge>
                <span className="sr-only font-extrabold ">User Cart</span>
            </Button>
            
            <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items : null}/>

            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black">
                        <AvatarFallback className="bg-black text-white" >{user?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { navigate("/shop/account") }}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>


                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function ShoppingHeader() {

    const { isAuthenticated, user } = useSelector(state => state.auth)
    const [openMenuItems,setOpenMenuItems] = useState(false)
    // console.log(user, "user")

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <HousePlug className="h-6 w-6" />
                    <span className="font-bold">E-Commerce</span>
                </Link>
                <Sheet open={openMenuItems} onOpenChange={()=>setOpenMenuItems(false)}>
                    
                        <Button variant="outline" size="icon" className="lg:hidden" onClick={()=>setOpenMenuItems(true)}>
                            <Menu />
                            <span className="sr-only">Toggler header menu</span>
                        </Button>
                    
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems setOpenMenuItems={setOpenMenuItems} openMenuItems={openMenuItems}/>
                        <HeaderRightComponent setOpenMenuItems={setOpenMenuItems} openMenuItems={openMenuItems}/>
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                <div className="hidden lg:block">
                    <HeaderRightComponent />
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;