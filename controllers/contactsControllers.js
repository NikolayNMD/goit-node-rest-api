import contactsService from "../services/contactsSrvices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await contactsService.listContacts({ owner }, { skip, limit });

  const filteredContacts = result.filter(
    (contact) => contact.favorite === Boolean(favorite)
  );
  res.json(filteredContacts);
};

const getOneContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await contactsService.getOneContact({ _id, owner });

  if (!result) {
    throw HttpError(404, `Contact with id:${_id} not found`);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await contactsService.removeOneContact({ _id, owner });

  if (!result) {
    throw HttpError(404, `Contact with id:${_id} not found`);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await contactsService.updateOneContact(
    { _id, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404, `Contact with id:${_id} not found`);
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
