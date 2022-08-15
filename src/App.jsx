import React from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './components/ContactForm/index';
import { Filter } from 'components/Filter';
import { ContactList } from './components/ContactList/index';
import styles from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    !this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }))
      : alert(`${name} is already in contacts.`);
  };

  onRemoveContact = Id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== Id),
    }));
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  onFilterContacts = () =>
    this.state.filter
      ? this.state.contacts.filter(({ name }) =>
          name.toLowerCase().includes(this.state.filter.toLowerCase())
        )
      : this.state.contacts;

  render() {
    const onAddContact = this.onAddContact;
    const { filter } = this.state;
    const filteredContacts = this.onFilterContacts();
    const onChangeFilter = this.onChangeFilter;
    const onRemoveContact = this.onRemoveContact;

    return (
      <div className={styles.app}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={onAddContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={onChangeFilter} />
        {this.state.contacts.length ? (
          <ContactList
            contacts={filteredContacts}
            onRemoveContact={onRemoveContact}
          />
        ) : (
          <h2 className={styles.notification}>Contact list is empty</h2>
        )}
      </div>
    );
  }
}
