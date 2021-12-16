const express = require("express");

const { ctrlWrapper, validation, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

// POST /api/users/signup
router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
// router.post("/signup", ctrl.signup);

router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
// router.post("/signin", ctrl.signin);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
// router.get("/signout", ctrl.signout);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
// router.get("/signout", ctrl.getCurrent);

module.exports = router;
