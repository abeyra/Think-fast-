import './Game.scss';
import { Component } from 'react';
import Timer from '../../components/Timer/Timer';
import Keyboard from '../../components/Keyboard/Keyboard';
import { WORDS } from '../../Words/words';

export default class Game extends Component {
    state = {
        NUMBER_OF_GUESSES: 6,
        userGuess: [],
        nextLetter: 0, 
        correctGuess: WORDS[Math.floor(Math.random() * WORDS.length)]
    }

    componentDidMount() {

        // let guessesRemaining = this.state.NUMBER_OF_GUESSES;
        
            

        this.createGameBoard();
        this.keyboardFunctions();
    }

    componentDidUpdate(){
        
         document.addEventListener("keyup", (event) => {
            if (this.state.NUMBER_OF_GUESSES === 0) {
                return;
            }

            let pressedKey = String(event.key);

            if(pressedKey === "Backspace" && this.state.nextLetter !== 0){
                this.deleteLetter();
                return;
            }

            if(pressedKey === "Enter") {
                this.checkGuess();
                return;
            }

            let found = pressedKey.match(/[a-z]/gi);

            if (!found || found.length > 1) {
                return;
            } else {
                this.insertLetter(pressedKey);
            }
        })

        this.insertLetter();
        this.deleteLetter();
        this.checkGuess();
        this.shadeKeyboard();
    }

    insertLetter = (pressedKey) => {
        if (this.state.nextLetter === 5) {
            return;
        }
        let playerInput = [];
        pressedKey = pressedKey.toLowerCase();

        let row = document.querySelector(".game__board-row")[6 - this.state.NUMBER_OF_GUESSES];
        let box = row.children[this.state.nextLetter]; 
        box.textContent = pressedKey;
        box.classList.add("game__board-box--filled");
        playerInput.push(pressedKey);
        this.setState({
            userGuess: playerInput,
            nextLetter: this.state.nextLetter + 1
        })
    }

    deleteLetter = () => {
        let playerInput = [];

        let row = document.querySelector(".game__board-row")[6 - this.state.NUMBER_OF_GUESSES];
        let box = row.children[this.state.nextLetter - 1];
        box.textContent = "";
        box.classList.remove("game__board-box--filled");
        this.state.playerInput.pop();
        this.setState({
            userGuess: playerInput,
            nextLetter: this.state.nextLetter - 1
        })
        // this.state.nextLetter -= 1;
    }

    checkGuess = () => {
        let row = document.querySelector(".game__board-row")[6 - this.state.NUMBER_OF_GUESSES];
        let guessString = "";
        let rightGuess = Array.from(this.state.correctGuess);

        for (const val of this.state.userGuess) {
            guessString += val;
        }

        if(guessString.length != 5) {
            alert("Not enough letters!");
            return;
        }

        if(!WORDS.includes(guessString)) {
            alert("Word not in list!");
            return;
        }

        for (let i = 0; i < 5; i++) {
            let letterColor = '';
            let box = row.children[i];
            let letter = this.state.userGuess[i];

            let letterPosition = rightGuess.indexOf(this.state.userGuess[i])
            // is letter a part of the correct word 
            if(letterPosition === -1) {
                letterColor = "grey";
            } else {
                // here letter is part of correct word
                // if letter index and right guess index are the same 
                // letter is is in the correct position 
                if (this.state.userGuess[i] === rightGuess[i]) {
                    // shade to Green
                    letterColor = "green";
                } else {
                    // shade box yellow if letter is in word but not in correct place
                    letterColor = "yellow";
                }

                rightGuess[letterPosition] = "#";
            }

            let delay = 250 * i; 
            setTimeout(() => {
                //shades box
                box.style.backgroundColor = letterColor;
                this.shadeKeyboard(letter, letterColor);
            }, delay)
        }

        if (guessString === this.state.correctGuess) {
            alert("You guessed right! You win!");
            this.setState({
                NUMBER_OF_GUESSES: 0
            })
            return
        } else {
            this.setState({
                NUMBER_OF_GUESSES: this.state.NUMBER_OF_GUESSES -1,
                userGuess: [],
                nextLetter: 0
            })

            if (this.state.NUMBER_OF_GUESSES === 0){
                alert("You've run out of guesses! Game over!");
                alert(`The correct word was: ${this.state.correctGuess}`);
            }
        }
    }

    shadeKeyboard = (letter, color) => {
        for (const element of document.querySelector(".keyboard__button")) {
            if(element.textContent === letter) {
                let oldColor = element.style.backgroundColor;
                if (oldColor === "green") {
                    return;
                }

                if (oldColor === "yellow" && color !== "green") {
                    return;
                }

                element.style.backgroundColor = color; 
                break;
            }
        }
    }

    keyboardFunctions = () => {
        document.querySelector(".keyboard__content").addEventListener("click", (event) => {
            const target = event.target;
            console.log(target.textContent);

            if (!target.classList.contains("keyboard__button")) {
                return;
            }
            let key = target.textContent;

            if (key === "Del") {
                key = "Backspace";
            }

            document.dispatchEvent(new KeyboardEvent("keyup", {"key": key}));
        })
    }

    createGameBoard = () => {

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

    render() {

        const hoursMinsSecs = {hours:0, minutes: 10, seconds: 0} 

        return (
            <>
                <section className='game'>                   
                    <Timer hoursMinsSecs={hoursMinsSecs}/>
                    <div className='game__board'>
                        
                    </div>
                    <Keyboard />
                </section>
            </>
        )
    }
}