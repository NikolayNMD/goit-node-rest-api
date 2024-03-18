import Contact from "../models/Contact.js";

const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, "-createdAt -updatedAt", query).populate(
    "owner",
    "name email"
  );

const addContact = (data) => Contact.create(data);

const getContactById = (id) => Contact.findById(id);

const getOneContact = (filter) =>
  Contact.findOne(filter).populate("owner", "email");

const updateContactById = (id, data) => Contact.findByIdAndUpdate(id, data);

const updateOneContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

const removeContact = (id) => Contact.findByIdAndDelete(id);

const removeOneContact = (filter) => Contact.findOneAndDelete(filter);

export default {
  listContacts,
  getContactById,
  getOneContact,
  addContact,
  updateContactById,
  updateOneContact,
  removeContact,
  removeOneContact
};
