import { Component } from 'react';
import axios from 'axios';
import './reset.css';
import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Game from './pages/Game/Game';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route to="/" exact component={Game}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

