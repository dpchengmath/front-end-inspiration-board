import PropTypes from 'prop-types';
import { useState } from 'react';
import './Card.css';

const Card = ({id, message, onLikeCardClick, onDeleteCard}) => {
  const [likesCount, setLikesCount] = useState(0);
  const handleLikeClick = () => {
    setLikesCount(likesCount + 1);
    if (onLikeCardClick) {
      onLikeCardClick(id);
    }
  };

  const deleteCardClick = () => {
    onDeleteCard(id);
  };

  return (
    <div className="card-items__container">
              <div className="card-item">
                <p className='card-item__message'>{message}</p>
                <ul className='card-item__controls'>
                  <li>
                  <span>{likesCount} 💕</span>
                  </li>
                  <li>
                    <p>+onClick={handleLikeClick}+1</p>
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
  onLikeCardClick: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};

export default Card;
