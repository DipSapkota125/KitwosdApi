import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodTitle: {
    type: String,
    required: [true, "Please filled foodTitle"],
  },
  foodDescription: {
    type: String,
    required: [true, "Please filled foodDescription"],
  },
  foodImage: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("food", foodSchema);
