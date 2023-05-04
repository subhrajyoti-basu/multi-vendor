import dotenv from "dotenv";
import app from "./app.js";
import colors from "colors";
import databaseConnect from "./database/connectDatabase.js";

// initalize dotenv
dotenv.config({
  path: "./config/.env",
});

const PORT = process.env.PORT;

// connect DB
databaseConnect();
// start the server
app.listen(PORT, () =>
  console.log(`Server is listening at port ${PORT} `.bgMagenta)
);
