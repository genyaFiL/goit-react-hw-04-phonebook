import PropTypes from 'prop-types';
import css from './FilterStyles.module.css';
export default function Filter({ value, onChange }) {
  return (
    <div className={css.container}>
      <label htmlFor="inputFind">Find contacts by name</label>
      <input
        type="text"
        name="name"
        id="inputFind"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
