const mongoose = require("mongoose");

const schema = mongoose.Schema
const model = mongoose.model;


const reviewSchema = new schema({
    title : {
        type : String,
        trim : true,
        required : [true, "Title is required"] ,
    },
    
    rate : {
        type : Number,
        min: [1, "Rate must be at least 1"] , 
        max : [5, "Rate must be at most 5"] ,
        required : [true, "Rate is required"] ,
    }, 

    product : {
        type : schema.Types.ObjectId,
        ref : "Product",
        required : [true, "Product is required"] ,
    },
    user : {
        type : schema.Types.ObjectId,
        ref : "User",
        required : [true, "User is required"] ,
    }
}, { timestamps: true });

reviewSchema.pre(/^find/, function(next){

    this.populate({ path : "user" , select: "name profileImg"});

    next();

})


const ReviewModel = model("Review", reviewSchema);
module.exports = ReviewModel;