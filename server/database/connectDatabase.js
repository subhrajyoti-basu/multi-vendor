import mongoose from "mongoose";

// connect to mongoose database
const databaseConnect = async () => {
  try {
    const message = await mongoose.connect(process.env.DB);
    console.log(
      `Server is connected to the database ${message.connection.host}`.bgCyan
    );
  } catch (error) {
    console.log("error connecting to database");
  }
};

export default databaseConnect;
