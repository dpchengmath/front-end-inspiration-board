import PropTypes from 'prop-types';
import { useState } from 'react';
import './Card.css';

const Card = ({id, message, likesCount, onLikeCardClick, onDeleteCard}) => {

  const handleLikeClick = () => {
      onLikeCardClick(id);

  };

  const deleteCardClick = () => {
    onDeleteCard(id);
  };

  return (
    <div className="card-items">
              <div className="card-item">
                <p className='card-item__message'>{message}</p>
                <ul className='card-item__controls'>
                  <li>
                  <span>{likesCount} 💕</span>
                  </li>
                  <li>
                    <button onClick={handleLikeClick}>+1</button>
                  </li>
                  <li>
                    <button onClick={deleteCardClick}>Delete</button>
                  </li>
                </ul>
              </div>
            </div>

  );
};

Card.propTypes = {
  id: PropTypes.number,
  message: PropTypes.string,
  likesCount: PropTypes.number,
  onLikeCardClick: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};

export default Card;
