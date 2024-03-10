import Contact from "../models/Contact.js";

const listContacts = () => Contact.find();

const addContact = (data) => Contact.create(data);

const getContactById = (id) => Contact.findById(id);

const updateContactById = (id, data) => Contact.findByIdAndUpdate(id, data);

const removeContact = (id) => Contact.findByIdAndDelete(id);

export default {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
