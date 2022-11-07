import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import shortid from 'shortid';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
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

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

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
