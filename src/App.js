import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';

function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const createContact = ({ name, number }) => {
    const isContactExist = contacts.find(contact => contact.name === name);
    if (isContactExist) {
      alert(`${name} is already exist in contacts`);
      return;
    }
    const id = uuidv4();
    const newContact = {
      name,
      number,
      id: id,
    };
    setContacts(state => [...state, newContact]);
  };

  const changeАFilterInput = event => {
    setFilter(event.currentTarget.value.toLowerCase());
  };
  const normilizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normilizedFilter),
  );

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={createContact} />
      <div>
        <h1>Contacts</h1>
        <Filter value={filter} onChangeInput={changeАFilterInput} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
}
