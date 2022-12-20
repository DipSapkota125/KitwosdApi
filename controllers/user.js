import User from "../models/user.js";

//register
export const register = async (req, res) => {
  try {
    const { fullName, email, mobile, password } = req.body;

    const avatar = req.file.filename;

    if (!fullName || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Filled must be filled!",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 characters!!",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User already exist!",
      });
    }

    const user = await User.create({
      fullName,
      email,
      mobile,
      password,
      avatar: avatar,
    });

    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,
    };

    res.status(200).json({
      success: true,
      message: "Register successfully!",
      // data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error.message",
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Filled must be filled",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `user doesn't exist!`,
      });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = user.getSignedJwtToken();

    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,
    };

    res.status(200).json({
      success: true,
      data: userData,
      message: "Login successfully!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error.message",
    });
  }
};

//single user(logged in)
export const singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist!",
      });
    }

    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,
    };

    res.status(200).json({
      success: true,
      message: "User get success!",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error.message",
    });
  }
};

//update profile

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, mobile } = req.body;
    const avatar = req.file.filename;
    if (!fullName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "filled must be update!",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, email, mobile, avatar: avatar },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,
    };

    res.status(200).json({
      success: true,
      message: "user update Successfully!",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error.message",
    });
  }
};
