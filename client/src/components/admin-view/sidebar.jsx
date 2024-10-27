import { BaggageClaim, LayoutDashboard, ShoppingBasket } from "lucide-react"
import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems=[
    {
        id:"dashboard",
        label:"Dashboard",
        href:"/admin/dashboard",
        icon: <LayoutDashboard />
    },
    {
        id:"products",
        label:"Products",
        href:"/admin/products",
        icon:<ShoppingBasket />,
    },
    {
        id:"orders",
        label:"Orders",
        href:"/admin/orders",
        icon:<BaggageClaim />,
    },
]

function MenuItems({setOpen}){
    const navigate = useNavigate();
    return (<nav className="mt-8 flex-col flex gap-2">
        {
            adminSidebarMenuItems.map(menuItem=>(
                <div key={menuItem.id} onClick={()=>{navigate(menuItem.href);
                    setOpen? setOpen(false):null
                }
                    
                } className="flex cursor-pointer text-xl gap-2 px-3 py-2 items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                {menuItem.icon}
                <span>{menuItem.label}</span>
                </div>
            ))
        }
    </nav>)
}






function AdminSidebar({open,setOpen}) {
    const navigate = useNavigate();
   

    return ( 
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64" >
                <div className="flex flex-col h-full">
                    <SheetHeader className="border-b">
                    <SheetTitle className="flex gap-2 mt-5 mb-5">
                    <ChartNoAxesCombined size={30} />
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>

                        </SheetTitle>
                    </SheetHeader>
                    <MenuItems setOpen={setOpen}/>
                </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden flex-col border-r bg-background p-6 lg:flex">

                <div onClick={()=>navigate("/admin/dashboard")} className="flex items-center cursor-pointer gap-2">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems/>
            </aside>
        </Fragment>
     );
}

export default AdminSidebar;