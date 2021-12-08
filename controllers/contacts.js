const { NotFound, BadRequest } = require("http-errors");
// const createError = require("http-errors");
const { Contact } = require("../models");

const listContacts = async (req, res, next) => {
  const result = await Contact.find({}, "_id name email phone favorite");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(
    contactId,
    "_id name email phone favorite"
  );
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact was found:",
    data: contact,
  });
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Contact add success",
    data: {
      result,
    },
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Сontact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Сontact deleted",
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
