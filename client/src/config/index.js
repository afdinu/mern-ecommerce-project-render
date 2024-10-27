

export const registerFormControls=[
    {
        name:"userName",
        label:"User Name",
        placeholder:"enter your user name",
        componentType:"input",
        type:"text",
        
    },
    {
        name:"email",
        label:"Email",
        placeholder:"enter your email",
        componentType:"input",
        type:"email",
       
    },
    {
        name:"password",
        label:"password",
        placeholder:"enter your password",
        componentType:"input",
        type:"password",
       
    }
]
export const loginFormControls=[
    {
        name:"email",
        label:"Email",
        placeholder:"enter your email",
        componentType:"input",
        type:"email",
       
    },
    {
        name:"password",
        label:"password",
        placeholder:"enter your password",
        componentType:"input",
        type:"password",
       
    }
]
export const addProductFormElements = [
    {
        name: "name",
        label: "Product Name",
        placeholder: "Enter the product name",
        componentType: "input",  // could be input, textarea, select, etc.
        type: "text",            // HTML input type
        required: true           // Additional validations or configurations
    },
    {
        name: "description",
        label: "Product Description",
        placeholder: "Enter a description",
        componentType: "textarea",  // A large text field for descriptions
        rows: 5                     // Set the number of rows for textarea
    },
    {
        name: "category",
        label: "Category",
        componentType: "select", // Dropdown menu
        options: [               // Categories or dynamic list from API
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids " },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "FootWear" },
        ],
        required: true
    },
    {
        name: "brand",
        label: "Brand",
        componentType: "select", // Dropdown menu
        options: [               // Categories or dynamic list from API
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma " },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "ZARA" },
            { id: "h&m", label: "H&M" },
        ],
        required: true
    },
    {
        name: "price",
        label: "Price",
        placeholder: "Enter the product price",
        componentType: "input",
        type: "number",          // Ensure this is a number input
        min: 0,                  // You can add HTML attributes like `min`
        required: true
    },
    {
        name: "salePrice",
        label: "Sale Price",
        placeholder: "Enter the product sale price (optional)",
        componentType: "input",
        type: "number",          // Ensure this is a number input
       
    },
   
    
    {
        name: "totalStock",
        label: "TotalStock",
        placeholder: "Enter the stock quantity",
        componentType: "input",
        type: "number",          // Ensure this is a number input
       
    },
    
   
];

export const shoppingViewHeaderMenuItems=[
    {
        id:"home",
        label:"Home",
        path:"/shop/home"
    },
    {
        id:"products",
        label:"Products",
        path:"/shop/listing"
    },
    {
        id:"men",
        label:"Men",
        path:"/shop/listing"
    },
    {
        id:"women",
        label:"Women",
        path:"/shop/listing"
    },
    {
        id:"kids",
        label:"Kids",
        path:"/shop/listing"
    },
    {
        id:"footwear",
        label:"Footwear",
        path:"/shop/listing"
    },
    {
        id:"accessories",
        label:"Accessories",
        path:"/shop/listing"
    },
    {
        id:"search",
        label:"Search",
        path:"/shop/search"
    },
]

export const filterOptions = {
    category : [
      
        {
            id:"men",
            label:"Men",
        
        },
        {
            id:"women",
            label:"Women",
     
        },
        {
            id:"kids",
            label:"Kids",

        },
        {
            id:"footwear",
            label:"Footwear",
         
        },
        {
            id:"accessories",
            label:"Accessories",
        },
    ],
    brand:[
        {
            id:"nike",
            label:"Nike",

        },
        {
            id:"adidas",
            label:"Adidas",

        },
        {
            id:"puma",
            label:"Puma",

        },
        {
            id:"levi",
            label:"Levi's",

        },
        {
            id:"zara",
            label:"Zara",

        },
        {
            id:"h&m",
            label:"H&M",

        },
    ]
}

export const sortOptions = [
    {id:"price-lowtohigh",label:"Price: Low to High"},
    {id:"price-hightolow",label:"Price: high to Low"},
    {id:"name-atoz",label:"Title: A to Z"},
    {id:"name-ztoa",label:"Title: Z to A"},
]

export const addressFormControls =[
    {
        label:"Address",
        name:"address",
        placeholder:"enter your address",
        componentType:"input",
        type:"text",
        
    },
    {
        label:"City",
        name:"city",
        placeholder:"enter your city",
        componentType:"input",
        type:"text",
        
    },
    {
        label:"Pincode",
        name:"pincode",
        placeholder:"enter your pincode",
        componentType:"input",
        type:"text",
        
    },
    {
        label:"Phone",
        name:"phone",
        placeholder:"enter your phone",
        componentType:"input",
        type:"text",
        
    },
    {
        label:"Notes",
        name:"notes",
        placeholder:"enter any extra instrutions for delivery ",
        componentType:"textarea",
  
        
    },
]