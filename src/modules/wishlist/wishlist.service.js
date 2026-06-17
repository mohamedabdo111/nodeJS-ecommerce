const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../user/user.model");
const ApiError = require("../../utils/apiError");

exports.AddProductToWishlist = expressAsyncHandler(async (req , res , next) => {
 
    const user = await UserModel.findByIdAndUpdate(req.user._id , {
        $addToSet : {
            wishlist : req.body.productId
        }
         
    } , {new : true})

    if(!user) {
        return next(new ApiError(404, "User not found"))
    }

    res.status(200).json({ message: "Product added to wishlist successfully", data: user })
})

exports.RemoveProductFromWishlist = expressAsyncHandler(async (req , res , next) => {

    const user = await UserModel.findByIdAndUpdate(req.user._id , {
        $pull : {
            wishlist : req.params.productId
        }
    } , {new : true})
    if(!user) {
        return next(new ApiError(404, "User not found"))
    }

    res.status(200).json({ message: "Product removed from wishlist successfully" })
})


exports.GetWishlistForLoggedUser = expressAsyncHandler(async (req , res , next) => {
    const user = await UserModel.findById(req.user._id).populate("wishlist")
    
    if(!user) {
        return next(new ApiError(404, "User not found"))
    }

    const wishlist = user.wishlist 
    if(!wishlist) {
        return next(new ApiError(404, "Wishlist not found"))
    }

    res.status(200).json({ data : wishlist })
})