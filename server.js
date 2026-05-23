const app = require("./src/app");
const connectDB = require("./src/database/database");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
