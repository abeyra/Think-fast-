import { Component } from 'react';
import './reset.css';
import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Game from './pages/Game/Game';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/game" exact component={Game}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

