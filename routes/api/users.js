const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

// POST /api/users/signup
router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
// router.post("/signup", ctrl.signup);

router.post("/login", ctrlWrapper(ctrl.login));
// router.post("/signin", ctrl.signin);

router.get("/logout", ctrlWrapper(ctrl.logout));
// router.get("/signout", ctrl.signout);

module.exports = router;
