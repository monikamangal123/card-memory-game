import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import '../styles/index.scss';

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
