import PropTypes from 'prop-types';

const Board = ({ id, title, owner, onClickCallback }) => {
  const onBoardClick = () => {
    onClickCallback(id);
  };

  return (
    <li className='boards__item'>
      <button className='boards__item' onClick={onBoardClick}>
        {title}
      </button>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
