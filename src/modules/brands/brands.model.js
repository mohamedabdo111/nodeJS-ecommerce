const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const brandSchema  = new  Schema({
    name: { 
        type : String,
        required : [true , "Brand name is required"],
        unique : true,
        minlength : [3 , "Brand name must be at least 3 characters long"],
        maxlength : [50 , "Brand name must be less than 50 characters long"]
    },
    slug: {
        type : String, 
        minlength : [3 , "Slug must be at least 3 characters long"],
    },
    image: String
} , {timestamps: true})

const BrandModel = model("Brand", brandSchema);
module.exports = BrandModel;