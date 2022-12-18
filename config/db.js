import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const ConnectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then((data) =>
      console.log(
        `MongoDB is connected at:${data.connection.host}`.cyan.underline.bold
      )
    );
};

export default ConnectDB;
