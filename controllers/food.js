import Food from "../models/food.js";

//admin can only add food details

export const AddDetails = async (req, res) => {
  try {
    const { foodTitle, foodDescription } = req.body;
    if (!foodTitle || !foodDescription) {
      return res.status(400).json({
        success: false,
        message: "Filled can't be empty!",
      });
    }
    const foodImage = req.file.filename;

    const exist = await Food.findOne({ foodTitle });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Name must be different!",
      });
    }

    const food = await Food.create({
      foodTitle,
      foodDescription,
      foodImage: foodImage,
    });

    res.status(200).json({
      success: true,
      message: "Food added Successfully!",
      data: food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all details
export const allDetails = async (req, res) => {
  try {
    const food = await Food.find();
    if (!food) {
      return res.status(400).json({
        success: false,
        message: "Not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "food get success!",
      data: food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  ``;
};

//for search
export const foodSearch = async (req, res) => {
  try {
    const { query, page = 1, limit = 10, sort = "asc" } = req.query;

    const pageNumber = Number(page);
    const pageLimit = Number(limit);

    const skip = (pageNumber - 1) * pageLimit;

    let sortOrder = {};
    if (sort === "asc") {
      sortOrder = { title: 1 };
    } else if (sort === "desc") {
      sortOrder = { title: -1 };
    }

    const foodTitle = new RegExp(query, "g");
    const foods = await Food.find({
      foodTitle,
    })
      .skip(skip)
      .limit(pageLimit)
      .sort(sortOrder);

    res.status(200).json({
      success: true,
      message: "Food get success!",
      data: foods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
