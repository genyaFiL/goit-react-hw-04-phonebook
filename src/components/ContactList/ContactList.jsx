import PropTypes from 'prop-types';
import css from './ContactListStyles.module.css';

export default function ContactList({ onDeleteContacts, contacts }) {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li key={id}>
          {name}: {number}
          <button
            type="button"
            onClick={() => onDeleteContacts(id)}
            className={css.btn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onDeleteContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
