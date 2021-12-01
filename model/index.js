const fs = require("fs/promises");
const { number } = require("joi");
const filePath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === Number(contactId));
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === Number(contactId));
  if (idx === -1) {
    return null;
  }
  const removeСontact = contacts.splice(idx, 1);
  await updateСontacts(contacts);
  return removeСontact;
};

const addContact = async (body) => {
  const newСontact = { ...body, id: Date.now() };
  const contacts = await listContacts();
  contacts.push(newСontact);
  await updateСontacts(contacts);
  return newСontact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = Number(contactId);
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };
  await updateСontacts(contacts);
  return contacts[idx];
};

const updateСontacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
