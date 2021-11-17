const fs = require("fs/promises");
// const contacts = require("./contacts.json");
const filePath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

// const getContactById = async (contactId) => { };
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === Number(contactId));
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
