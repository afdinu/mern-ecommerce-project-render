

const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");



const handleImageUpload = async (req,res)=>{
    try{

        const b64  = Buffer.from(req.file.buffer).toString("base64")
        const url = "data:"+ req.file.mimetype+";base64,"+b64;
        const result = await imageUploadUtil(url);
        return res.json({success:true,result})
    }catch(error){
        console.log(error);
       return res.json({success:false,message:"Error Occured"})
    }
}

// add a product

const addProduct = async (req,res)=>{
    try {
        const {image,name,description,category,brand,price,salePrice,totalStock} = req.body;

        const newyCreatedProduct = new Product({image,name,description,category,brand,price,salePrice,totalStock})
        await newyCreatedProduct.save();
       return res.status(201).json({success:true,data:newyCreatedProduct})


    } catch (error) {
        console.log(error)
        res.status(500).json({status:false,message:"Error occured"})
    }
}

// fetch all products
const fetchAllProducts = async (req,res)=>{
    try {
        const listOfProducts = await Product.find({});
       return res.status(200).json({success:true,data:listOfProducts})
        
    } catch (error) {
        console.log(error)
       return res.status(500).json({status:false,message:"Error occured"})
    }
}

// edit a product
const editProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const {image,name,description,category,brand,price,salePrice,totalStock} = req.body;
        const findProduct = await Product.findById(id)

        if(!findProduct){
            return res.status(404).json({status:false,message:"Product not found"})
        }
        findProduct.name=name||findProduct.name;
        findProduct.description=description||findProduct.description;
        findProduct.category=category||findProduct.category;
        findProduct.brand=brand||findProduct.brand;
        findProduct.price=price==""?0:price||findProduct.price;
        findProduct.salePrice=salePrice==""?0:salePrice||findProduct.salePrice;
        findProduct.totalStock=totalStock||findProduct.totalStock;
        findProduct.image=image||findProduct.image;

        await findProduct.save()

        return  res.status(200).json({success:true,data:findProduct})
        
    } catch (error) {
        console.log(error)
        return  res.status(500).json({status:false,message:"Error occured"})
    }
}

// delete a product
const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const findProduct =await Product.findByIdAndDelete(id);

        if(!findProduct){
            return res.status(404).json({status:false,message:"Product not found"})
        }
        return  res.status(200).json({success:true,message:"Product deleted successfully"})
        
    } catch (error) {
        console.log(error)
        return  res.status(500).json({status:false,message:"Error occured"})
    }
}

module.exports = {handleImageUpload,addProduct,fetchAllProducts,editProduct,deleteProduct}