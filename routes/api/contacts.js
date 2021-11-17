const express = require("express");
const router = express.Router();
const contactsOperations = require("../../model");

router.get("/", async (req, res, next) => {
  const list = await contactsOperations.listContacts();
  res.json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw new Error(`Not found contact with id=${contactId}`);
  }
  // console.log("Contact was found:\n", contact);
  // return contact;
  res.json({ status: "success", message: "Contact was found:\n", contact });
});

router.post("/", async (req, res, next) => {
  res.json({
    status: "success",
    message: "Contact add success",
  });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
