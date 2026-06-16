const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      minlength: [3, "Product title must be at least 3 characters long"],
      maxlength: [100, "Product title must be less than 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Product quantity must be greater than 0"],
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      min: [0, "Product price must be greater than 0"],
      max: [1000000, "Product price must be less than 1000000"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "Product price after discount must be greater than 0"],
      max: [1000000, "Product price after discount must be less than 1000000"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    colors: [String],
    images: [String],
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Product brand is required"],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

// using mongoose middleware to populate the category and subCategories and brand
productSchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});

productSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    if (ret.imageCover) {
      ret.imageCover = `${process.env.BASE_URL}/products/covers/${ret.imageCover}`;
    }
    if (ret.images) {
      ret.images = ret.images.map(
        (image) => `${process.env.BASE_URL}/products/images/${image}`,
      );
    }

    return ret;
  },
});

const ProductModel = model("Product", productSchema);

module.exports = ProductModel;
