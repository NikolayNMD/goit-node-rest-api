import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((item) => item.id === contactId) || null;
}

async function addContact(data) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
}

async function updateContactById(contactId, data) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...data };
  await updateContacts(contacts);

  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [isset] = contacts.splice(index, 1);
  await updateContacts(contacts);

  return isset;
}

export default {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
