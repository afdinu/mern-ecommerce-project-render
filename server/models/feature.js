const mongoose = require("mongoose")

const featureSchema= new mongoose.Schema({
    image: String,
},{timeStamps:true})

module.exports  = mongoose.model("Feature",featureSchema)