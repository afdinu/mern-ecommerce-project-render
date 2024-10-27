import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({filter,handleFilter}) {
    return ( 
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="font-extrabold text-lg" >Filters</h2>
            </div>
        <div className="p-4 space-y-4">
        {
            Object.keys(filterOptions).map(keyItem=>(
                <Fragment key={keyItem}>
                    <div>
                        <h3 className="text-base font-semibold">{keyItem}</h3>
                        <div className=" grid gap-2 mt-2"> 
                        {
                            filterOptions[keyItem].map(option=>(
                                <Label key={option.id} className="flex items-center gap-2 font-medium">
                                    <Checkbox  checked={
                                        filter && Object.keys(filter).length>0 && filter[keyItem] &&
                                        filter[keyItem].indexOf(option.id)>-1
                                    } onCheckedChange={()=>handleFilter(keyItem,option.id )}/>
                                    {option.label}
                    
                                </Label>
                            ))
                        }</div>
                    </div>
                    <Separator/>
                </Fragment>
            ))
        }
        </div>
        </div>
     );
}

export default ProductFilter;