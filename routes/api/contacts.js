const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
// const createError = require("http-errors");
const router = express.Router();
const contactsOperations = require("../../model");
const joiSchema = require("../../schemas/contactSchema");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    // throw new Error("Не удалось...");
    res.json(contacts);
  } catch (error) {
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: error.message,
    // });
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Not found contact with id=${contactId}`);

      // throw new createError(404, `Not found contact with id=${contactId}`);

      // const error = new Error(`Not found contact with id=${contactId}`);
      // error.status = 404;
      // throw error;

      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Not found contact with id=${contactId}`,
      // });
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact was found:",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact add success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.patch("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Сontact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Сontact deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
