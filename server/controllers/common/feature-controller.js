const Feature = require("../../models/feature")

const addFeatureImage = async(req,res)=>{
    try{
        const {image} = req.body;
        console.log(image)
        const featureImage = new Feature({
            image
        })
        await featureImage.save()
        return res.status(200).json({success:true,data:featureImage})
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Failed to add feature image"})
    }
}
const getFeatureImages = async(req,res)=>{
    try{
        const images = await Feature.find({})
        return res.status(200).json({success:true,data:images})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Failed to fetch feature images"})
    }
}
module.exports = {addFeatureImage,getFeatureImages}