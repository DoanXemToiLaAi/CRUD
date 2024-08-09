const Post = require("../Models/Post");
const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params; // Lấy userId từ URL params
    const { content, title } = req.body;

    if (!content || !title) {
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });
    }

    // Tạo bài post với userId
    const newPost = await Post.create({
      ...req.body,
      user: uid,
    });

    // Cập nhật model User để lưu post
    await User.findByIdAndUpdate(
      uid,
      { $push: { posts: newPost._id } },
      // Giả sử bạn có một mảng posts trong model User
      { new: true }
    );

    return res.status(200).json({
      success: newPost ? true : false,
      newPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mes: "thiếu",
    });
  }
});

const deletedPost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await Post.findByIdAndDelete(pid);
  return res.status(200).json({
    success: response ? true : false,
    mes: "Post go to heaven",
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await Post.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "ko có update gì cả",
  });
});

const getPost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await Post.findById(pid).select("-_id title content");
  return res.status(200).json({
    success: response ? true : false,
    response,
  });
});

const getPosts = asyncHandler(async (req, res) => {
  const response = await Post.find().select("-_id title content");
  return res.status(200).json({
    success: response ? true : false,
    response,
  });
});

module.exports = {
  createPost,
  deletedPost,
  updatePost,
  getPost,
  getPosts,
};
