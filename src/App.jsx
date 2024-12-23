
import './App.css';
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

const kbaseURL = 'http://localhost:5000';

const convertFromBoardApi = (board) => {
  const newBoard = {
    ...board,
    id:board.board_id,
  };
  delete newBoard.board_id;
  return newBoard;
};

const convertFromCardApi = (card) => {
  const newCard = {
    ...card,
    id: card.card_id,
    likesCount: card.likes_count,
    boardId: card.board_id,
  };
  delete newCard.card_id;
  delete newCard.likes_count;
  delete newCard.board_id;
  return newCard;
};

const getAllBoardsApi = () => {
  return axios.get(`${kbaseURL}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching boards', error);
    });
};

const getAllCardsApi = (boardId) => {
  return axios.get(`${kbaseURL}/boards/${boardId}/cards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching cards', error);
    });
};

const deleteCardApi = (cardId) => {
  return axios.delete(`${kbaseURL}/cards/${cardId}`)
    .catch((error) => {
      console.error('Error deleting card', error);
    });
};

const App = () => {
  const onClickCallback = (id) => {
    console.log(`Board with id ${id} clicked`);
  };

  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);

  const handleBoardSubmit = (newBoard) => {
    return axios.post(`${kbaseURL}/boards`, newBoard)
      .then((response) => { 
        setBoardsData([...boardsData, convertFromBoardApi(response.data)]);
      })
      .catch((error) => {
        console.error('Error creating board', error);
      });
  };

  const getAllBoards =() => {
    getAllBoardsApi()
      .then((data) => {
        setBoardsData(data.map(convertFromBoardApi));
      }); 
  };

  const BOARDS = [
    {
      id: 1,
      title: 'Pick-me-up Quotes',
      owner: 'Sunitha',
    },
    {
      id: 2,
      title: 'Test board',
      owner: 'Lorraine',
    },
  ];


  return (
    <div className='content_container'>
    <div id="root">
      <h1>Inspiration Board</h1>
      <section className='boards__container'>
        <section>
          <h2>Boards</h2>
          <ol className='boards__list'>
            <BoardList boards={BOARDS} onClickCallback={onClickCallback} />
          </ol>
        </section>
        <section>
          <h2>Selected Board</h2>
          <p>Select a Board from the Board List!</p>
        </section>
        <section>
          <h2>Create a New Board</h2>
          <NewBoardForm onBoardSubmit={handleBoardSubmit}/>
        </section>
      </section>
    </div>
       
      </div>
  );
};

export default App;
