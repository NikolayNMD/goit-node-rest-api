import contactsService from "../services/contactsSrvices.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (_, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOneContact = (req, res) => {};

const deleteContact = (req, res) => {};

const createContact = (req, res) => {};

const updateContact = (req, res) => {};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
