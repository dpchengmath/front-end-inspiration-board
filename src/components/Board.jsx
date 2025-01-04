import PropTypes from 'prop-types';


const Board = ({ boards, onBoardClick}) => {

  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
      <li key={board.id} onClick={()=>onBoardClick(board.id)}>
          <div>{board.title}</div>
      </li>
      )
    });
  }
  return <ol className='boards__list' >{getBoardListJSX(boards)}</ol>;
};

Board.propTypes =  {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBoardClick:PropTypes.func.isRequired
};

export default Board;
