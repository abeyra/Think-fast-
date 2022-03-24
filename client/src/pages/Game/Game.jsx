import './Game.scss';
import { Component } from 'react';
import Timer from '../../components/timer/timer';
import { WORDS } from '../../words/words';

export default class Game extends Component {
    state = {
        NUMBER_OF_GUESSES: 6,
        guess: [],
        nextLetter: 0, 
        correctGuess: WORDS[Math.floor(Math.random() * WORDS.length)]
    }

    componentDidMount() {

        let guessesRemaining = this.state.NUMBER_OF_GUESSES;
      
        let createGameBoard = () => {

            let board = document.querySelector(".game__board");

            for (let i = 0; i < this.state.NUMBER_OF_GUESSES; i++) {
                let row = document.createElement("div");
                row.classList.add("game__board-row");

                for (let j = 0; j < 5; j++) {
                    let box = document.createElement("div");
                    box.classList.add("game__board-box");
                    row.appendChild(box);
                }

                board.appendChild(row);
            }
        }

       createGameBoard();
    }

    componentDidUpdate(){
         
    }

    render() {

        const hoursMinsSecs = {hours:0, minutes: 0, seconds: 5} 
        // const NUMBER_OF_GUESSES = 6; 
        // let guessesRemaining = NUMBER_OF_GUESSES;
        // let guess = [];
        // let nextLetter = 0; 
        // let correctGuess = WORDS[Math.floor(Math.random() * WORDS.length)];

        return (
            <>
                <section className='game'>                   
                    <Timer hoursMinsSecs={hoursMinsSecs}/>
                    <div className='game__board'>
                        
                    </div>
                </section>
            </>
        )
    }
}