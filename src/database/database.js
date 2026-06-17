const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const connectDB = () => mongoose.connect(process.env.DB_URI);

module.exports = connectDB;
