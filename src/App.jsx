
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import Board from './components/Board';
import NewCardForm from './components/NewCardForm'
import CardList from './components/CardList';


// const kbaseURL = 'http://localhost:5000';


// const convertFromBoardApi = (board) => {
//   const newBoard = {
//     ...board,
//     id:board.board_id,
//   };
//   delete newBoard.board_id;
//   return newBoard;
// };



// const convertFromCardApi = (card) => {
//   const newCard = {
//     ...card,
//     id: card.card_id,
//     likesCount: card.likes_count,
//     boardId: card.board_id,
//   };
//   delete newCard.card_id;
//   delete newCard.likes_count;
//   delete newCard.board_id;
//   return newCard;
// };

// const getAllBoardsApi = () => {
//   return axios.get(`${kbaseURL}/boards`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error('Error fetching boards', error);
//     });
// };

// const getAllCardsApi = (boardId) => {
//   return axios.get(`${kbaseURL}/boards/${boardId}/cards`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error('Error fetching cards', error);
//     });
// };

// const deleteCardApi = (cardId) => {
//   return axios.delete(`${kbaseURL}/cards/${cardId}`)
//     .catch((error) => {
//       console.error('Error deleting card', error);
//     });
// };

const App = () => {

  const [boardsData, setBoardsData] = useState([{
    id: 1,
    title: 'Pick-me-up Quotes',
    owner: 'Sunitha',
  },
  {
    id: 2,
    title: 'Test board',
    owner: 'Lorraine',
  }]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cardsData, setCardsData] = useState([]);


  const onBoardClick = (id) => {
    const clickedBoard = boardsData.find((board) => board.id === id);
    setSelectedBoard(clickedBoard);
  };

//   const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);


//   const handleBoardSubmit = (newBoard) => {
//     return axios.post(`${kbaseURL}/boards`, newBoard)
//       .then((response) => {
//         setBoardsData([...boardsData, convertFromBoardApi(response.data)]);
//       })
//       .catch((error) => {
//         console.error('Error creating board', error);
//       });
//   };

//   const getAllBoards =() => {
//     getAllBoardsApi()
//       .then((data) => {
//         setBoardsData(data.map(convertFromBoardApi));
//       });
//   };
const addBoard = (newBoard) => {
  const newBoardWithId = { ...newBoard, id: boardsData.length + 1 };
  setBoardsData([...boardsData, newBoardWithId]);
};

const addCard = (newCard) => {
  if (selectedBoard) {
    const newCardWithId = { ...newCard, id: cardsData.length + 1, boardId: selectedBoard.id };
    setCardsData([...cardsData, newCardWithId]);
  }
};
  const getCardsForSelectedBoard = () => {
    return cardsData.filter(card => card.boardId === selectedBoard?.id);
  };
  const handleLikeCardClick = (id) => {
    // Handle like card click if needed
  };

  const handleDeleteCard = (id) => {
    setCardsData(cardsData.filter(card => card.id !== id));
  };

  return (
    <div className='content_container'>
    <div id="root">
      <h1>Inspiration Board</h1>
      <section className='boards__container'>
        <section>
          <h2>Boards</h2>
          <Board boards = {boardsData} onBoardClick={onBoardClick}/>

        </section>
        <section>
          <h2>Selected Board</h2>
          {selectedBoard && (
            <p>{selectedBoard.title} - {selectedBoard.owner}</p>
          )}
        </section>
        {selectedBoard && (
          <section className="cards__container">
            <h2>Cards For {selectedBoard.title}</h2>
            <CardList cards={getCardsForSelectedBoard()}
            onLikeCardClick={handleLikeCardClick}
            onDeleteCard={handleDeleteCard} />
          </section>
        )}
        <section className="new-board-form__container">
          <h2>Create a New Board</h2>
          <NewBoardForm addBoardCallback={addBoard} />
        </section>
        {selectedBoard && (
          <section className="new-card-form__container">
            <h2>Create a New Card</h2>
            <NewCardForm addCardCallback={addCard} />
          </section>
        )}


      </section>
    </div>
  </div>
);

};

export default App;
