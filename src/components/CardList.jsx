import PropTypes from 'prop-types';
import Card from './Card.jsx';
import './CardList.css';

const CardList = ({ cards, onLikeCardClick, onDeleteCard}) => {
  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          message={card.message}
          onLikeCardClick={onLikeCardClick}
          onDeleteCard={onDeleteCard}
        />
      );
    });
  };
  return <div className="card-items__container">{getCardListJSX(cards)}</div>;
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      isComplete: PropTypes.bool,
    })
  ).isRequired,
  onLikeCardClick: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};

export default CardList;
