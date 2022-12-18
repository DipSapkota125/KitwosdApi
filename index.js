import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import ConnectDB from "./config/db.js";
import userRoute from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//display image
app.use("/gallery", express.static("gallery"));

dotenv.config();

//database
ConnectDB();

//routes
app.use("/api", userRoute);

//server is working
app.get("/", (req, res) => {
  res.send(`<h1>Server is working</h1>`);
});

//server port

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running at port:${PORT}`.cyan.underline.bold);
});
