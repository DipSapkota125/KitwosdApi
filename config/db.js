import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const ConnectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB is connected at : ${connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default ConnectDB;
