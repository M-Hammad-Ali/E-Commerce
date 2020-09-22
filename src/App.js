import React from 'react';
import {Route} from 'react-router-dom'

import './App.css';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = ()=> (
  <div><h1>HatsPage</h1></div>
)

function App() {
  return (
    <div>
      <Route path="/" component={HomePage}/>
      <Route path='/hats' component={HomePage }/>
    </div>
  );
}

export default App;
