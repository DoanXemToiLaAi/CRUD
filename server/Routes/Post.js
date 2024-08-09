const router = require("express").Router();
const ctrls = require("../Controllers/Post");

router.post("/create/:uid", ctrls.createPost);
router.delete("/delete/:pid", ctrls.deletedPost);
router.get("/get/:pid", ctrls.getPost);
router.put("/update/:pid", ctrls.updatePost);
router.get("/", ctrls.getPosts);

module.exports = router;
