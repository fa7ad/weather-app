import React from 'react';
import './App.css';

interface AppProps {
  language: String;
}

const App: React.FC<AppProps> = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn {props.language}
        </a>
      </header>
    </div>
  );
};

export default App;
