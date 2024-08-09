const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password)
      return res.status(400).json({
        success: false,
        mes: "Please fill all fields",
      });
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        mes: "Account already created",
      });
    } else {
      const newUser = await User.create(req.body);
      return res.status(200).json({
        success: newUser ? true : false,
        newUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      mes: "Server lỏ",
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const response = await User.find()
    .select("-role -password -address -isBlocked -_id")
    .populate({
      path: "posts",
      select: "-_id title content",
    });
  return res.status(200).json({
    success: response ? true : false,
    user: response,
  });
});

const deletedUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    success: response ? true : false,
    mes: "user go to hell",
  });
});

const findUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findById(uid).select(
    "-role -password -address -isBlocked -id"
  );
  return res.status(200).json({
    success: response ? true : false,
    response,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "ko có gì để update",
  });
});

module.exports = {
  register,
  getUser,
  findUser,
  deletedUser,
  updateUser,
};
