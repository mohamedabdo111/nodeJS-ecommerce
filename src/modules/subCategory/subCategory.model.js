const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const subCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be less than 50 characters long"],
    },
    slug: {
        type: String,
        minlength: [3, "Slug must be at least 3 characters long"],
    },
    category: {
        type: Schema.ObjectId,
        ref: "Category",
        required: [true, "SubCategory must be associated with a category"],
    }

} ,{ timestamps: true });

const SubCategoryModel = model("SubCategory", subCategorySchema);
module.exports = SubCategoryModel;