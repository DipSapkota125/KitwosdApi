import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const ConnectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then((data) =>
        console.log(
          `MongoDB is connected at:${data.connection.host}`.cyan.underline.bold
        )
      );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default ConnectDB;
