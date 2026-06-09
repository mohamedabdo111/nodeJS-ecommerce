const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

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

const UserModel = model("User", userSchema);
module.exports = UserModel;
