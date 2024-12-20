import {useState} from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const NewBoardForm = ({addBoardCallback}) => {


  return (
    <section >
      <h2>Create a New Board</h2>
      <form className="new-board-form__form" onSubmit={onSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
        />
        <label>Owner's Name</label>
        <input
          type="text"
          value={owner}
          onChange={onOwnerChange}
        />
        <p>Preview: {title} - {owner}</p>
        <input
          type="submit"
          disabled={!title || !owner}
        />
      </form>
      <span class="new-board-form__toggle-btn">Hide New Board Form</span>
    </section>
  );
}

export default NewBoardForm;