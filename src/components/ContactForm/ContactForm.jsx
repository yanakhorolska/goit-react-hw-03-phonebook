import './ContactForm.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };
  nameChange = e => {
    this.setState({
      name: e.currentTarget.value,
    });
  };
  numberChange = e => {
    this.setState({
      number: e.currentTarget.value,
    });
  };
  render() {
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <label className="Form_label">
          Name
          <input
            className="Form_input"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.nameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className="Form_label">
          Number
          <input
            className="Form_input"
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.numberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className="Form_button" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
