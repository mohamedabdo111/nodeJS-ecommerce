const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../user/user.model");
const ApiError = require("../../utils/apiError");

exports.AddUserAddress = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        address: req.body,
      },
    },
    { new: true },
  );

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  res.status(200).json({ message: "Address added successfully", data: user });
});

exports.RemoveUserAddress = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        address: {
          _id: req.params.id,
        },
      },
    },
    { new: true },
  );

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  res.status(200).json({ message: "Address removed successfully" });
});

exports.GetUesrAddresses = expressAsyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const addresses = user.address;
  if (!addresses) {
    return next(new ApiError(404, "Addresses not found"));
  }

  res.status(200).json({ data: addresses });
});

exports.UpdateUserAddress = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findOneAndUpdate(
    { _id: req.user._id, "address._id": id },
    {
      $set: {
        "address.$.title": req.body.title,
        "address.$.details": req.body.details,
        "address.$.phone": req.body.phone,
        "address.$.city": req.body.city,
        "address.$.postalCode": req.body.postalCode,
        "address.$.country": req.body.country,
      },
    },
    { new: true },
  );

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  res.status(200).json({ message: "Address updated successfully", data: user });
});
