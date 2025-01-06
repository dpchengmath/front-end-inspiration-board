
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import { useEffect, useState } from 'react';
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

//   const addCard = (newCard) => {
//     if (selectedBoard) {
//       const newCardWithId = { ...newCard, id: cardsData.length + 1, boardId: selectedBoard.id };
//       setCardsData([...cardsData, newCardWithId]);
//     }
//   };

const handleLikeCardClick = (id) => {
  return axios.put(`${kbaseURL}/cards/${id}/liked`)
    .then((response) => {
      const updatedCard = convertFromCardApi(response.data);
      setCardsData((prevCards) => prevCards.map(card => card.id === id ? updatedCard : card));
    })
    .catch((error) => {
      console.error('Error liking card', error);
    });
};


  const handleDeleteCard = (id) => {
    setCardsData(cardsData.filter(card => card.id !== id));
  };
  const handleDeleteAll = () => {
    return axios.delete(`${kbaseURL}/boards`)
      .then(() => {
        setBoardsData([]);
        setCardsData([]);
        setSelectedBoard(null);
      })
      .catch((error) => {
        console.error('Error deleting all boards and cards', error);
      });
  };


  return (
    <div className='content_container'>
      <div id="root">
        <h1>Inspiration Board</h1>
        <section className='boards__container'>
          <section>
            <h2>Boards</h2>
            <ol className='boards__list'>
              {boardsData.map(board => (
                <li key={board.id} onClick={() => onBoardClick(board.id)}>
                  {board.title}
                </li>
              ))}
            </ol>
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
          {selectedBoard && (
            <section className="cards__container">
              <section>
                <h2>Cards For {selectedBoard.title}</h2>
                <CardList
                  cards={cardsData}
                  onLikeCardClick={handleLikeCardClick}
                  onDeleteCard={handleDeleteCard}
                />
              </section>
              <section className="new-card-form__container">
                <h2>Create a New Card</h2>
                <NewCardForm addCardCallback={handleCardSubmit} />
              </section>
            </section>
          )}
        </section>
        <footer className="footer">
          <p onClick={handleDeleteAll}>Click here to delete all boards and cards!</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
