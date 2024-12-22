
import './App.css';
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';

const App = () => {
  const onClickCallback = (id) => {
    console.log(`Board with id ${id} clicked`);
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
          <NewBoardForm />
        </section>
      </section>
    </div>
       
      </div>
  );
};
export default App;
