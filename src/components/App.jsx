import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import shortid from 'shortid';
import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Harry Potter', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Granger', number: '443-89-12' },
      { id: 'id-3', name: 'Ron Weasley', number: '645-17-79' },
      { id: 'id-4', name: 'Albus Dumbledore', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
    return true;
  };
  filterChanger = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className="Phonebook_box">
        <h1 className="Phonebook_title">Wizard's phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className="Phonebook_second-title">Contacts</h2>
        <Filter value={this.state.filter} filterChanger={this.filterChanger} />
        <ContactList
          contacts={visibleContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
export default App;
