import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const createContacts = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    setContacts(prevState => {
      return [...prevState, newContact];
    });
  };

  const deleteContacts = contactsId => {
    setContacts(contacts.filter(name => name.id !== contactsId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getfilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log('contacts in get filter=', contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  //cdm
  useEffect(() => {
    const getContacts = localStorage.getItem('contacts');
    console.log('getContacts', getContacts);
    const parsedContacts = JSON.parse(getContacts);
    console.log('parsedContacts', parsedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const isThisFirstRender = useRef(true);

  //cdu
  useEffect(() => {
    if (isThisFirstRender.current) {
      isThisFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  console.log('contacts', contacts);
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} createContacts={createContacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        onDeleteContacts={deleteContacts}
        contacts={getfilteredContacts()}
      />
    </div>
  );
}
