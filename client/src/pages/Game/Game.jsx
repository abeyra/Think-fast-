import './Game.scss';
import { Component } from 'react';

export default class Game extends Component {
    state = {
        count: 5,
        intervalId: ''
    }

    componentDidMount() {
        let intervalId = setInterval(() => {
            this.setState({
                count: this.state.count - 1,
                intervalId: intervalId
            })
        }, 1000)

    }

    componentDidUpdate(){
         if(this.state.count === 0){
            alert('Time has ran out!');
            clearInterval(this.state.intervalId);
        }
    }

    render() {
        return (
            <>
                <section className='game'>                   
                    <h1 className='game__title'>Timer</h1>
                    <h2>{this.state.count}</h2>
                </section>
            </>
        )
    }
}