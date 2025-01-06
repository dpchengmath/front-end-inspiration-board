
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import Board from './components/Board';
import NewCardForm from './components/NewCardForm'
import CardList from './components/CardList';
import axios from 'axios';

const kbaseURL = 'http://127.0.0.1:5000';

const getAllBoardsApi = () => {
  return axios.get(`${kbaseURL}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching boards', error);
    });
};

const convertFromBoardApi = (board) => {
  const newBoard = {
    ...board,
    id:board.board_id,
  };
  delete newBoard.board_id;
  return newBoard;
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

const deleteCardApi = (cardId) => {
  return axios.delete(`${kbaseURL}/cards/${cardId}`)
    .catch((error) => {
      console.error('Error deleting card', error);
    });
};

const App = () => {

  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cardsData, setCardsData] = useState([]);

  const getAllBoards =() => {
    getAllBoardsApi()
    .then((data) => {
      setBoardsData(data['boards'].map(convertFromBoardApi));
    });
  };

  const getCardsForSelectedBoard = () => {
    getAllCardsApi(selectedBoard.id)
      .then((data) => {
        setCardsData(data['cards'].map(convertFromCardApi));
      });
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  useEffect(() => {
    if (selectedBoard?.id) {
      getCardsForSelectedBoard();
    } else {
      setCardsData([]);
    }
  }, [selectedBoard]);

  const onBoardClick = (id) => {
    const clickedBoard = boardsData.find((board) => board.id === id);
    setSelectedBoard(clickedBoard);
  };

//   const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);

  const handleBoardSubmit = (newBoard) => {
    return axios.post(`${kbaseURL}/boards`, newBoard)
      .then((response) => {
        setBoardsData((prevBoards)=>[...prevBoards, convertFromBoardApi(response.data)]);
      })
      .catch((error) => {
        console.error('Error creating board', error);
      });
  };

  const handleCardSubmit = (newCard) => {
    return axios.post(`${kbaseURL}/boards/${selectedBoard.id}/cards`, newCard)
      .then((response) => {
        setCardsData((prevCards)=>[...prevCards, convertFromCardApi(response.data)]);
      })
      .catch((error) => {
        console.error('Error creating card', error);
      });
  };

// const addBoard = (newBoard) => {
//   const newBoardWithId = { ...newBoard, id: boardsData.length + 1 };
//   setBoardsData([...boardsData, newBoardWithId]);
// };

  // const addCard = (newCard) => {
  //   if (selectedBoard) {
  //     const newCardWithId = { ...newCard, id: cardsData.length + 1, boardId: selectedBoard.id };
  //     setCardsData([...cardsData, newCardWithId]);
  //   }
  // };

  const handleLikeCardClick = (id) => {
    // Handle like card click if needed
  };

  const handleDeleteCard = (id) => {
    deleteCardApi(id)
      .then(() => {
        setCardsData((cardsData)=>cardsData.filter((card) => card.id !== id));
        return cardsData;
      });
  };

  return (
    <div id="root">
      <div className='page__container'>
        <div className='content_container'>
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
        <section className="new-board-form__container">
          <h2>Create a New Board</h2>
          <NewBoardForm addBoardCallback={handleBoardSubmit} />
        </section>
      </section>
      {selectedBoard && (
        <section className="cards__container">
          <section>
            <h2>Cards For {selectedBoard.title}</h2>
            <CardList cards={cardsData}
            onLikeCardClick={handleLikeCardClick}
            onDeleteCard={handleDeleteCard} />
          </section>
          <section className="new-card-form__container">
            <h2>Create a New Card</h2>
            <NewCardForm addCardCallback={handleCardSubmit} />
          </section>
        </section>
      )}
      </div>
    </div>
  </div>
);

};

export default App;
