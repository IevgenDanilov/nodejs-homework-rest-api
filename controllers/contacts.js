const { NotFound, BadRequest } = require("http-errors");
// const createError = require("http-errors");
const { Contact } = require("../models");

// const listContacts = async (req, res, next) => {
//   const contacts = await contactsOperations.listContacts();
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       contacts,
//     },
//   });
// };

// const getContactById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await contactsOperations.getContactById(contactId);
//   if (!contact) {
//     throw new NotFound(`Not found contact with id=${contactId}`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     message: "Contact was found:",
//     data: contact,
//   });
// };

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

// const updateContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contactsOperations.updateContact(contactId, req.body);
//   if (!result) {
//     throw new NotFound(`Product with id=${contactId} not found`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result,
//     },
//   });
// };

// const removeContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contactsOperations.removeContact(contactId);
//   if (!result) {
//     throw new NotFound(`Сontact with id=${contactId} not found`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     message: "Сontact deleted",
//   });
// };

module.exports = {
  // listContacts,
  // getContactById,
  addContact,
  // updateContact,
  // removeContact,
};
