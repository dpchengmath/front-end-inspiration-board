import { useState } from 'react';
import PropTypes from 'prop-types';

const NewCardForm = ({ addCardCallback }) => {
  const kDefaultFormState = {
    message: '',
  };

  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    addCardCallback(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <div>
          <label htmlFor='message'>Message: </label>
          <input
            type='text'
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <p>Preview: {formData.message}</p>
        <div>
          <input type='submit' value='Submit' />
        </div>
      </form>
    </div>
  );
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;
