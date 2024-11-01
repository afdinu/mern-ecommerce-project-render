import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice/authSlice";
import {  useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

function AdminHeader({setOpen}) {
    const dispatch = useDispatch();
    const toast = useToast()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        
      // dispatch(logoutUser())
      dispatch(resetTokenAndCredentials())
      sessionStorage.clear()
      navigate("/auth/login")
            
     
    }
    return ( 
      <header className="flex items-center justify-between px-4 py-4 bg-background border-b">
        <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
            <AlignJustify/>
            <span className="sr-only">Toggle-Menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
            <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md shadow px-4 py-2 text-sm font-medium">
            <LogOut/>
            Logout
            </Button>
        </div>
      </header>
     );
}

export default AdminHeader;