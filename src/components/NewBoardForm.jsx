import  { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const NewBoardForm = ({ addBoardCallback }) => {

  const kDefaultFormState = {
    title: '',
    owner: '',
  };

  const [formData, setFormData] = useState(kDefaultFormState);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    addBoardCallback(formData);
    setFormData(kDefaultFormState);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      {isFormVisible ? (
        <form onSubmit={onHandleSubmit}>
          <div>
            <label htmlFor='title'>Title: </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='owner'>Owner: </label>
            <input
              type='text'
              id='owner'
              name='owner'
              value={formData.owner}
              onChange={handleChange}
            />
          </div>
          <p>Preview: {formData.title} - {formData.owner}</p>
          <div>
            <input type='submit' value='Submit' />
          </div>
          <div>
            <button type="button" onClick={toggleFormVisibility}>Hide New Board Form</button>
          </div>
        </form>
      ) : (
        <button onClick={toggleFormVisibility}>Show New Board Form</button>
      )}
    </div>
  );
};

NewBoardForm.propTypes = {
  addBoardCallback: PropTypes.func.isRequired,
};

export default NewBoardForm;