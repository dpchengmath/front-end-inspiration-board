import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {

  return (
    <div class="content_container">
      <h1>Inspiration Board</h1>
        <section class="boards__container">
          <section>
            <h2>Boards</h2>
            <ol class="boards__list">
              <li><div>Pick-me-up Quotes</div></li>
              <li><div>sailor moon</div></li>
            </ol>
          </section>
          <section>
            <h2>Selected Board</h2>
            <p>Select a Board from the Board List!</p>
          </section>
          <section>
            <h2>Create a New Board</h2>
            {/* <NewBoardForm /> */}
          </section>
        </section>
      </div>
  );
}
export default App;