const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const categorySchema = new Schema(
  {
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
    image: String,
  },
  { timestamps: true },
);

categorySchema.set("toJSON", {
  transform(doc, ret) {
    if (ret.image) {
      ret.image = `${process.env.BASE_URL}/categories/${ret.image}`;
      return ret;
    }
  },
});

// model
const CategoryModel = model("Category", categorySchema);

module.exports = CategoryModel;
