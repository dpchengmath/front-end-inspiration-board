import {useState} from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const NewBoardForm = ({handleBoardSubmit}) => {

  const kDefaultFormState = {
    title: '',
    owner: '',
  };

  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    handleBoardSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
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
        <label htmlFor='owner'>Owner's Name: </label>
        <input
          type='text'
          id='owner'
          name='owner'
          value={formData.owner}
          onChange={handleChange}
        />
      </div>
      <p>Preview: </p>
      <div>
        <input type='submit' value='Submit' />
      </div>
    </form>
  );
};


export default NewBoardForm;