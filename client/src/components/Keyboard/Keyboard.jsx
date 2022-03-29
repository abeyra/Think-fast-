import './Keyboard.scss';
import { Component } from 'react';

export default class Keyboard extends Component {


    componentDidUpdate() {
        // function keyboardFunctions() {
        //     document.querySelector(".keyboard__content").addEventListener("click", (event) => {
        //         const target = event.target;

        //         if (!target.classList.contains("keyboard__button")) {
        //             return
        //         }
        //         let key = target.textContent;

        //         if (key === "Del") {
        //             key = "Backspace"
        //         }

        //         document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}));
        //     })
        // }
        // keyboardFunctions();
    }

    render() {
        return (
            <>
                <section className="keyboard">                    
                    <div className="keyboard__content">
                        <div className="keyboard__content-first-row">
                            <button className="keyboard__button">q</button>
                            <button className="keyboard__button">w</button>
                            <button className="keyboard__button">e</button>
                            <button className="keyboard__button">r</button>
                            <button className="keyboard__button">t</button>
                            <button className="keyboard__button">y</button>
                            <button className="keyboard__button">u</button>
                            <button className="keyboard__button">i</button>
                            <button className="keyboard__button">o</button>
                            <button className="keyboard__button">p</button>
                        </div>
                        <div className="keyboard__content-second-row">
                            <button className="keyboard__button">a</button>
                            <button className="keyboard__button">s</button>
                            <button className="keyboard__button">d</button>
                            <button className="keyboard__button">f</button>
                            <button className="keyboard__button">g</button>
                            <button className="keyboard__button">h</button>
                            <button className="keyboard__button">j</button>
                            <button className="keyboard__button">k</button>
                            <button className="keyboard__button">l</button>
                        </div>
                        <div className="keyboard__content-third-row">
                            <button className="keyboard__button">Del</button>
                            <button className="keyboard__button">z</button>
                            <button className="keyboard__button">x</button>
                            <button className="keyboard__button">c</button>
                            <button className="keyboard__button">v</button>
                            <button className="keyboard__button">b</button>
                            <button className="keyboard__button">n</button>
                            <button className="keyboard__button">m</button>
                            <button className="keyboard__button">Enter</button>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}