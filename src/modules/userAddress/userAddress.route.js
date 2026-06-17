const express = require("express");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const { AddUserAddress, GetUesrAddresses, RemoveUserAddress, UpdateUserAddress } = require("./userAddress.service");
const router = express.Router();

router.route("/").post(protectRoutes, allowedTo("user"), AddUserAddress).get(protectRoutes, allowedTo("user"), GetUesrAddresses);

router.route("/:id").put(protectRoutes, allowedTo("user"), UpdateUserAddress).delete(protectRoutes, allowedTo("user"), RemoveUserAddress);

module.exports = router;