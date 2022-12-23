import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please filled your name!"],
  },
  email: {
    type: String,
    required: [true, "Please filled your email!"],
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, "please filled your mobile"],
    maxLength: [10, "Number must be only 10 digits"],
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password must be filled!"],
    maxLength: [15, "password must be at least 15 characters!"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

//encrypted password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//jwt token generate
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
