import PropTypes from 'prop-types';
import Board from './Board';
import { useState } from 'react';

const BoardList = ({ boards, onClickCallback }) => {
  const [clickedBoard, setClickedBoard] = useState(null);

  const onBoardClick = (id) => {
    const clickedBoard = boards.find((board) => board.id === id);
    setClickedBoard(clickedBoard);
    onClickCallback(id);
  };

  return (
    <div>
      <ul className='boards__list no-bullet'>
        {boards.map((board) => (
          <Board
            key={board.id}
            id={board.id}
            title={board.title}
            owner={board.owner}
            onClickCallback={onBoardClick}
          />
        ))}
      </ul>
      {clickedBoard && (
        <div>
          <h2>Selected Board</h2>
          <p>
            {clickedBoard.title} - {clickedBoard.owner}
          </p>
        </div>
      )}
    </div>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default BoardList;
