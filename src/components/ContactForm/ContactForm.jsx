import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactFormStyles.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const normalizedName = this.state.name.toLocaleLowerCase();
    this.props.contacts.find(
      option => option.name.toLocaleLowerCase() === normalizedName
    )
      ? alert(this.state.name + ' is allready in contacts')
      : this.props.createContacts({
          name: this.state.name,
          number: this.state.number,
        });

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form_contacts}>
        <label htmlFor="inputName">Name</label>
        <input
          className={css.form_input}
          type="text"
          name="name"
          id="inputName"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
          value={this.state.name}
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
          onChange={this.handleChange}
          value={this.state.number}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
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
export default ContactForm;
