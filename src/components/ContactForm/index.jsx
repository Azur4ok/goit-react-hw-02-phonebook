import React from 'react';
import PropTypes from 'prop-types';

import styles from './ContactForm.module.css';

export class ContactForm extends React.Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  resetState = () => {
    this.setState({ name: '', number: '' });
  };
  handleClick = () => {
    if (!this.state.name && !this.state.number) {
      return alert('Invalid name or number');
    }
    this.props.addContact(this.state);
    this.resetState();
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <h4>Name</h4>
        <input
          onChange={this.handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <h4>Number</h4>
        <input
          onChange={this.handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={styles.btn} onClick={this.handleClick}>
          Add contact
        </button>
      </div>
    );
  }
}
