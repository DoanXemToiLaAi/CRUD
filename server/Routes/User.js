const router = require("express").Router();
const ctrls = require("../Controllers/User");

router.post("/register", ctrls.register);
router.delete("/:uid", ctrls.deletedUser);
router.get("/", ctrls.getUser);
router.get("/:uid", ctrls.findUser);
router.put("/update/:uid", ctrls.updateUser);

module.exports = router;
