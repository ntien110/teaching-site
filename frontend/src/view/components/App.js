import React from 'react';

import Modal from "./Modal.component.js"
import Header from "./Header.component.js"

import '../style/App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="navigator">Navigate</div>
      <div className="content">Content</div>
      <Modal>hello</Modal>
    </div>
  );
}

export default App;
