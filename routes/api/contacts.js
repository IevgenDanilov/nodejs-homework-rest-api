const express = require("express");

const { ctrlWrapper, validation, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { joiUpdStatusSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(joiUpdStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeContact));

module.exports = router;
