import PropTypes from 'prop-types';

import './Card.css';

const Card = ({id, message, onLikeCardClick, onDeleteCard}) => {

  const deleteCardClick = () => {
    onDeleteCard(id);
  };

  return (
    <div className="card-items__container">
              <div className="card-item">
                <p className='card-item__message'>this is a testing</p>
                <ul className='card-item__controls'>
                  <li>
                    <p>3💕</p>
                  </li>
                  <li>
                    <p>+1</p>
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
