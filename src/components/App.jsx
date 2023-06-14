import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  createContacts = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContacts = contactsId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(name => name.id !== contactsId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getfilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    // console.log(this.state.contacts);
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    // console.log('componentDidMount');
    const getContacts = localStorage.getItem('contacts');
    // console.log('contactss', contactss);
    const parsedContacts = JSON.parse(getContacts);
    // console.log('parsedContacts', parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.contacts !== prevState.contacts) {
      // console.log('обновилось');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const { filter, contacts } = this.state;

    const filteredContacts = this.getfilteredContacts;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} createContacts={this.createContacts} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          onDeleteContacts={this.deleteContacts}
          contacts={filteredContacts()}
        />
      </div>
    );
  }
}
export default App;
