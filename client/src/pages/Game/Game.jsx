import './Game.scss';
import { Component } from 'react';
import Timer from '../../components/timer/timer';

export default class Game extends Component {
    state = {
      
    }

    componentDidMount() {
       
    }

    componentDidUpdate(){
         
    }

    render() {

        const hoursMinsSecs = {hours:0, minutes: 0, seconds: 5} 

        return (
            <>
                <section className='game'>                   
                    <Timer hoursMinsSecs={hoursMinsSecs}/>
                </section>
            </>
        )
    }
}