import './Game.scss';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Timer from '../../components/Timer/Timer';
import Keyboard from '../../components/Keyboard/Keyboard';
import { WORDS } from "../../Words/Words";
import axios from 'axios';
const url = "https://boiling-plains-79200.herokuapp.com";

export default class Game extends Component {
    state = {
        NUMBER_OF_GUESSES: 6,
        userGuess: [],
        nextLetter: 0, 
        correctGuess: WORDS[Math.floor(Math.random() * WORDS.length)],
        currentLetter: null,
        timeLeft: null
    }

    componentDidMount() {
        
        document.addEventListener("keyup", (event) => {
            if (this.state.NUMBER_OF_GUESSES === 0) {
                return;
            }

            let pressedKey = String(event.key);
            console.log("pressedKey", pressedKey);

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
                // return;
            }
        })

        this.createGameBoard();
        this.keyboardFunctions();
    }

    componentDidUpdate(){
        
        
        //  document.addEventListener("keyup", (event) => {
        //     if (this.state.NUMBER_OF_GUESSES === 0) {
        //         return;
        //     }

        //     let pressedKey = String(event.key);
        //     console.log("pressedKey", pressedKey);

        //     if(pressedKey === "Backspace" && this.state.nextLetter !== 0){
        //         this.deleteLetter();
        //         return;
        //     }

        //     if(pressedKey === "Enter") {
        //         this.checkGuess();
        //         return;
        //     }

        //     let found = pressedKey.match(/[a-z]/gi);

        //     if (!found || found.length > 1) {
        //         return;
        //     } else {
        //         this.insertLetter(pressedKey);
        //         return;
        //     }
        // })

        // this.insertLetter();
        // this.deleteLetter();
        // this.checkGuess();
        // this.shadeKeyboard();
    }

    insertLetter = (pressedKey) => {
        if (pressedKey) {
            if (this.state.nextLetter === 5) {
                return;
            }
            // let playerInput = [];
            pressedKey = pressedKey.toLowerCase();

            let row = document.getElementsByClassName("game__board-row")[6 - this.state.NUMBER_OF_GUESSES];
            let box = row.children[this.state.nextLetter]; 
            box.textContent = pressedKey;
            box.classList.add("game__board-box--filled");
            // let playerInput = this.state.userGuess.push(pressedKey);
            // console.log(playerInput);
            this.setState({
                userGuess: [...this.state.userGuess, pressedKey],
                nextLetter: this.state.nextLetter + 1
            })
        }
    }

    deleteLetter = () => {
        // let playerInput = this.state.userGuess.pop();

        let row = document.getElementsByClassName("game__board-row")[6 - this.state.NUMBER_OF_GUESSES];
        let box = row.children[this.state.nextLetter - 1];
        console.log(box);
        box.textContent = "";
        box.classList.remove("game__board-box--filled");
        
        this.setState({
            userGuess: this.state.userGuess.slice(0, -1),
            nextLetter: this.state.nextLetter - 1
        })
        // this.state.nextLetter -= 1;
    }

    checkGuess = () => {
        let row = document.getElementsByClassName("game__board-row")[6 - this.state.NUMBER_OF_GUESSES];
        let guessString = "";
        let rightGuess = Array.from(this.state.correctGuess);
        console.log('check guess working');

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

        let user = JSON.parse(sessionStorage.getItem("user"));

        if (guessString === this.state.correctGuess) {
            alert(`You guessed right ${user.userName}! You win! You had ${this.state.NUMBER_OF_GUESSES -1} guesses left!`);

            console.log(user.id);
            axios.post(`/endgame`, {
                attemptsLeft: this.state.NUMBER_OF_GUESSES -1,
                word: this.state.correctGuess,
                id: user.id
            })
            setTimeout( () => {
                    this.setState({
                    NUMBER_OF_GUESSES: 0
                })
            }, 3000)
            
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
        let btn = document.getElementsByClassName("keyboard__button");

        for (let i = 0; i < btn.length; i++) {
            if(btn[i].textContent === letter) {
                let oldColor = btn[i].style.backgroundColor;
                if (oldColor === "green") {
                    return;
                }

                if (oldColor === "yellow" && color !== "green") {
                    return;
                }

                btn[i].style.backgroundColor = color; 
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
            // this.setState({
            //     currentLetter: key
            // })

            if (key === "Del") {
                console.log('working');
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

        let hoursMinsSecs = {hours:0, minutes: 10, seconds: 0} 

        if (this.state.NUMBER_OF_GUESSES === 0) {
            return <Redirect to="/leaderboard" />;
        }

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