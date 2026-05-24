const app = require("./src/app");
const connectDB = require("./src/database/database");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;
connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// handling errors outside of express
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
