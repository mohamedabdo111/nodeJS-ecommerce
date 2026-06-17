const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require("bcrypt");
const { ref } = require("process");
const saltRounds = 10;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    slug: {
      type: String,
      lowerCase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // child reference
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    address: [
      {
        title: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
        country: String,
      },
    ],

    resetCode: String,
    resetCodeExpiredTime: Date,
    resetCodeIsVerified: Boolean,
  },

  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.profileImg) {
      ret.profileImg = `${process.env.BASE_URL}/users/${ret.profileImg}`;
    }
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const UserModel = model("User", userSchema);
module.exports = UserModel;
