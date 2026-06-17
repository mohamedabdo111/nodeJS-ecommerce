const mongoose = require("mongoose");
const ProductModel = require("../product/product.model");

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

// aggregate to calculate the average rating and quantity 
reviewSchema.statics.calcAvgAndQuantity = async function (productId){
    const results = await this.aggregate([
        {
            $match : {product : productId}
        },
        {
            $group : {
                _id : "$product",
                avgRating : {"$avg" : "$rate"},
                ratingsQuantity : {"$sum" : 1},
            }
        }
        
    ])

    const stats = results[0] || {
        avgRating : 0,
        ratingsQuantity : 0,
    };

    await ProductModel.findByIdAndUpdate(productId , {
        ratingsAverage : stats.avgRating,
        ratingsQuantity : stats.ratingsQuantity,
    }, {new : true})
}

reviewSchema.post("save" , async function() {
    await this.constructor.calcAvgAndQuantity(this.product)
})

reviewSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
      await doc.constructor.calcAvgAndQuantity(doc.product);
    }
  });


const ReviewModel = model("Review", reviewSchema);

module.exports = ReviewModel;