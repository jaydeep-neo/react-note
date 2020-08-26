import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store from './store/store'

import NoteList from './components/Notes/NoteList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <NoteList />
          </div>
      </div>
    </Provider>
  );
}

export default App;
