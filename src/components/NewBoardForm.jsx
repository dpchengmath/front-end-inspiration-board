import {useState} from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const NewBoardForm = () => {

  return (
    <section >
      <form className="new-board-form__form" >
        <div>
          <label>Title</label> 
        </div>
        <div>
          <input
            type="text"
            // value={title}
            // onChange={onTitleChange}
          />
        </div>
        <div>
          <label>Owner's Name</label>  
        </div>
        <div>
          <input
            type="text"
            // value={owner}
            // onChange={onOwnerChange}
          />
        </div>

        <p>Preview:    </p>
        <input
          type="submit"
          // disabled={!title || !owner}
        />
      </form>
      <span class="new-board-form__toggle-btn">Hide New Board Form</span>
    </section>
  );
}

export default NewBoardForm;