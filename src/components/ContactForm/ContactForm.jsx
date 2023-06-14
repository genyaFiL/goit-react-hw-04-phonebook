import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactFormStyles.module.css';

export default function ContactForm({ contacts, createContacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target }) => {
    if (target.name === 'name') setName(target.value);
    if (target.name === 'number') setNumber(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const normalizedName = name.toLocaleLowerCase();
    contacts.find(option => option.name.toLocaleLowerCase() === normalizedName)
      ? alert(name + ' is allready in contacts')
      : createContacts({
          name: name,
          number: number,
        });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form_contacts}>
      <label htmlFor="inputName">Name</label>
      <input
        className={css.form_input}
        type="text"
        name="name"
        id="inputName"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        value={name}
      />
      <label htmlFor="inputNumber">Number</label>
      <input
        className={css.form_input}
        type="tel"
        name="number"
        id="inputNumber"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        value={number}
      />
      <button type="submit">Add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  createContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
